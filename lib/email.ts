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

type ContactPayload = {
  name: string | null;
  email: string;
  message: string;
  /** Null from the Research form, which asks only about supply. */
  organisation?: string | null;
  /** Already resolved against the published list by the caller. */
  topic?: string | null;
};

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
  const organisation = input.organisation?.trim() || null;
  const topic = input.topic?.trim() || null;
  const messageHtml = escapeHtml(input.message).replace(/\n/g, "<br>");

  // A subject is a header, and a line break is where a header ends. The action
  // already flattens `name` before it gets here, but this module is exported and
  // should not depend on its caller having done that.
  const headerSafe = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 200);

  // The topic leads the subject line, so the inbox sorts itself. En dash, matching
  // the rule the site itself follows.
  const subject = headerSafe(
    topic ? `${topic} – ${name}` : `New contact from ${name}`,
  );

  const row = (term: string, valueHtml: string) => `
      <tr>
        <td style="padding:4px 16px 4px 0;color:rgba(36,26,18,0.5);white-space:nowrap;">${term}</td>
        <td style="padding:4px 0;">${valueHtml}</td>
      </tr>`;

  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:8px 0;color:#241a12;">
    <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#A75A2B;margin:0 0 6px;">${topic ? escapeHtml(topic) : "New contact"} · symbia.studio</p>
    <h1 style="font-size:20px;font-weight:600;margin:0 0 20px;">${escapeHtml(name)}</h1>
    <table style="border-collapse:collapse;font-size:14px;margin:0 0 18px;">${row(
      "Email",
      `<a href="mailto:${escapeHtml(input.email)}" style="color:#F04E3E;text-decoration:none;">${escapeHtml(input.email)}</a>`,
    )}${organisation ? row("Company", escapeHtml(organisation)) : ""}${
      topic ? row("About", escapeHtml(topic)) : ""
    }
    </table>
    <div style="border-left:3px solid rgba(240,78,62,0.4);padding:2px 0 2px 16px;font-size:15px;line-height:1.6;color:rgba(36,26,18,0.85);">${messageHtml}</div>
    <p style="margin:24px 0 0;font-size:12px;color:rgba(36,26,18,0.4);">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
  </div>`.trim();

  const text = [
    topic ? `${topic} enquiry from ${name}` : `New contact from ${name}`,
    "",
    `Email: ${input.email}`,
    organisation ? `Company: ${organisation}` : null,
    "",
    input.message,
    "",
    "Reply to this email to respond.",
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: input.email,
      subject,
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
