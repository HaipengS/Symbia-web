import "server-only";

import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/constants";

// Client is created lazily and only when a key exists, so a missing key never
// crashes the build or the server action — the email just gets skipped.
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// `from` must be on a domain verified in Resend. `onboarding@resend.dev` works
// with zero setup but can ONLY deliver to the Resend account's own email. Once
// symbia.studio is verified in Resend, set CONTACT_FROM_EMAIL to a branded
// sender, e.g. "Symbia <notifications@symbia.studio>".
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Symbia <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL;

type ContactPayload = { name: string | null; email: string; message: string };

export type EmailOutcome =
  | { ok: true }
  | { ok: false; skipped: true }
  | { ok: false; skipped?: false; error: string };

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string,
  );

/**
 * Sends Rayden a notification when someone submits the contact form. Best-effort:
 * the Supabase row is the source of truth, so callers should NOT fail a
 * submission if this returns an error — just log it.
 */
export async function sendContactNotification(
  input: ContactPayload,
): Promise<EmailOutcome> {
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY not set — skipping contact notification.",
    );
    return { ok: false, skipped: true };
  }

  const name = input.name?.trim() || "Someone";
  const messageHtml = escapeHtml(input.message).replace(/\n/g, "<br>");

  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:8px 0;color:#241a12;">
    <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#A75A2B;margin:0 0 6px;">New contact · symbia.studio</p>
    <h1 style="font-size:20px;font-weight:600;margin:0 0 20px;">${escapeHtml(name)}</h1>
    <table style="border-collapse:collapse;font-size:14px;margin:0 0 18px;">
      <tr>
        <td style="padding:4px 16px 4px 0;color:rgba(36,26,18,0.5);">Email</td>
        <td style="padding:4px 0;"><a href="mailto:${escapeHtml(input.email)}" style="color:#F04E3E;text-decoration:none;">${escapeHtml(input.email)}</a></td>
      </tr>
    </table>
    <div style="border-left:3px solid rgba(240,78,62,0.4);padding:2px 0 2px 16px;font-size:15px;line-height:1.6;color:rgba(36,26,18,0.85);">${messageHtml}</div>
    <p style="margin:24px 0 0;font-size:12px;color:rgba(36,26,18,0.4);">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
  </div>`.trim();

  const text = `New contact from ${name}\n\nEmail: ${input.email}\n\n${input.message}\n\n— Reply to this email to respond.`;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: input.email,
      subject: `New contact — ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("[email] Resend send failed", error);
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (e) {
    console.error("[email] Resend threw", e);
    return { ok: false, error: e instanceof Error ? e.message : "unknown error" };
  }
}
