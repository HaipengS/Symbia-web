"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { appendWaitlistRow } from "@/lib/sheets";
import { LIMITS, cleanEmail, cleanSource, singleLine } from "@/lib/form-input";

type WaitlistResult =
  | { success: true }
  | { success: false; error: string };

/**
 * The Google Sheet is the record of signups: it is the tracker the team actually
 * works out of, and it is reachable. Supabase is kept as a mirror so nothing is
 * lost if that project comes back, but it can no longer decide whether a signup
 * succeeds. A visitor only sees an error when BOTH destinations refused the row.
 */
export async function joinWaitlist(
  _prevState: WaitlistResult,
  formData: FormData,
): Promise<WaitlistResult> {
  // Every one of these lands in a spreadsheet cell, including `source`, which is a
  // hidden field and therefore the visitor's to set. See lib/form-input.
  const email = cleanEmail(formData);
  const name = singleLine(formData, "name", LIMITS.name) || null;
  const source = cleanSource(formData);

  if (!email) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const sheet = await appendWaitlistRow({ name, email, source });

  if (sheet.ok && sheet.duplicate) {
    return { success: false, error: "You're already on the waitlist!" };
  }

  // A deleted or paused Supabase project rejects at the network layer, which
  // throws rather than returning an `error`, so both paths are caught here.
  const mirror = await supabaseServer
    .from("waitlist")
    .insert({ email, name })
    .then(
      ({ error }) => ({ ok: !error, reason: error?.message }),
      (e: unknown) => ({
        ok: false,
        reason: e instanceof Error ? e.message : "unreachable",
      }),
    );

  if (!mirror.ok) {
    console.warn("[waitlist] Supabase mirror unavailable:", mirror.reason);
  }

  if (!sheet.ok && !mirror.ok) {
    console.error("[waitlist] both destinations refused the row", {
      sheet: "error" in sheet ? sheet.error : sheet,
      supabase: mirror.reason,
    });
    return {
      success: false,
      error: "We couldn't save your details just now. Please try again in a moment.",
    };
  }

  return { success: true };
}
