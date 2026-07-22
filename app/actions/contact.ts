"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { sendContactNotification } from "@/lib/email";

export type ContactResult =
  | { success: true }
  | { success: false; error: string };

function getContactErrorMessage(error: { code?: string; message?: string }) {
  if (process.env.NODE_ENV !== "production") {
    if (error.code === "PGRST205") {
      return "Supabase table `contacts` was not found. Create it in your Supabase project first.";
    }

    if (error.code === "42501") {
      return "Supabase blocked the insert. Add a contacts INSERT policy or use SUPABASE_SERVICE_ROLE_KEY for this server action.";
    }

    return error.message || "Supabase rejected the contact insert.";
  }

  return "Something went wrong. Please try again.";
}

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

  // Source of truth: persist the message.
  const { error } = await supabaseServer
    .from("contacts")
    .insert({ name, email, message });

  if (error) {
    console.error("Contact insert failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return { success: false, error: getContactErrorMessage(error) };
  }

  // Best-effort notification to Rayden. The row is already saved, so a failed
  // email must not fail the submission — we await it (serverless would kill a
  // fire-and-forget send) but only log failures.
  const notified = await sendContactNotification({ name, email, message });
  if (!notified.ok && !notified.skipped) {
    console.error("Contact email notification failed", notified.error);
  }

  return { success: true };
}
