"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { sendContactNotification } from "@/lib/email";

export type ContactResult =
  | { success: true }
  | { success: false; error: string };

/**
 * The point of this form is that Rayden gets an email, so sending it is the step
 * that decides whether a submission succeeded.
 *
 * It used to run the other way around: the message was inserted into Supabase
 * first and the send was only reached if that insert came back clean. Once that
 * project stopped resolving, every submission returned an error and the email was
 * never attempted at all. Supabase is still written to, so nothing is lost if the
 * project returns, but it can no longer block the notification.
 */
export async function submitContact(
  _prevState: ContactResult,
  formData: FormData,
): Promise<ContactResult> {
  const name = (formData.get("name") as string | null)?.trim() || null;
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const message = (formData.get("message") as string | null)?.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (!message) {
    return { success: false, error: "Please enter a message." };
  }

  const notified = await sendContactNotification({ name, email, message });

  // Archive copy. A dead or paused project rejects at the network layer, which
  // surfaces either as an `error` or as a rejected promise, so both are handled.
  const archived = await supabaseServer
    .from("contacts")
    .insert({ name, email, message })
    .then(
      ({ error }) => ({ ok: !error, reason: error?.message }),
      (e: unknown) => ({
        ok: false,
        reason: e instanceof Error ? e.message : "unreachable",
      }),
    );

  if (!archived.ok) {
    console.warn("[contact] Supabase archive unavailable:", archived.reason);
  }

  // Only a submission that reached neither Rayden nor the archive is a failure
  // worth showing the visitor, since anything else means the message got through.
  if (!notified.ok && !archived.ok) {
    console.error("[contact] message was not delivered anywhere", {
      email: notified.skipped ? "skipped, RESEND_API_KEY not set" : notified.error,
      supabase: archived.reason,
    });
    return {
      success: false,
      error: "We couldn't send your message just now. Please try again in a moment.",
    };
  }

  if (!notified.ok) {
    console.error(
      "[contact] notification email failed, message archived only:",
      notified.skipped ? "RESEND_API_KEY not set" : notified.error,
    );
  }

  return { success: true };
}
