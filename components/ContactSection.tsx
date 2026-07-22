"use client";

import { useActionState, type ReactNode } from "react";
import { submitContact, type ContactResult } from "@/app/actions/contact";

type ContactSectionProps = {
  email: string;
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  /** Section heading. */
  heading?: string;
  /** Supporting copy. Defaults to the "we read every note" line with the email. */
  description?: ReactNode;
  /** Label above the free-text field. */
  messageLabel?: string;
  /** Placeholder for the free-text field. */
  messagePlaceholder?: string;
  /**
   * Centered single-column header (used on the wide Research page). The default
   * split header (heading left, description right) is kept for home + gallery.
   */
  centered?: boolean;
};

const initialState: ContactResult = { success: false, error: "" };

export default function ContactSection({
  email,
  eyebrow = "Get in touch",
  heading = "Let's work together",
  description,
  messageLabel = "How can we help?",
  messagePlaceholder = "Tell us about your product, collaboration, or event.",
  centered = false,
}: ContactSectionProps) {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  const resolvedDescription = description ?? (
    <>
      We read every note. We&apos;ll respond from{" "}
      <a
        className="text-ink/70 underline decoration-ink/20 underline-offset-4 transition hover:text-coral"
        href={`mailto:${email}`}
      >
        {email}
      </a>
      .
    </>
  );

  return (
    <section
      id="contact"
      className="w-full text-left"
      aria-label="Contact Symbia"
    >
      {centered ? (
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold text-ink">{heading}</h2>
          <p className="max-w-xl text-sm leading-relaxed text-ink/55">
            {resolvedDescription}
          </p>
        </div>
      ) : (
        <div className="mb-10 grid gap-4 md:grid-cols-[1fr_1fr] md:items-end">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">
              {eyebrow}
            </p>
            <h2 className="font-display text-4xl font-bold text-ink">{heading}</h2>
          </div>
          <p className="text-sm leading-relaxed text-ink/50 md:text-right">
            {resolvedDescription}
          </p>
        </div>
      )}

      <div className="card-surface rounded-2xl p-7">
        {state.success ? (
          <div className="flex flex-col items-start gap-3 py-4">
            <span className="font-display text-5xl text-coral" aria-hidden>✓</span>
            <p className="font-display text-2xl font-bold text-ink">Message sent.</p>
            <p className="text-sm leading-relaxed text-ink/60">
              Thanks for reaching out — we&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            action={formAction}
            className="grid gap-5 md:grid-cols-2"
            autoComplete="off"
          >
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.1em] text-ink/40">Your name</span>
              <input
                className="w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-coral/40 focus:bg-ink/[0.06]"
                name="name"
                type="text"
                placeholder="Rayden Yap"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.1em] text-ink/40">Email</span>
              <input
                className="w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-coral/40 focus:bg-ink/[0.06]"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="md:col-span-2 space-y-2">
              <span className="text-xs uppercase tracking-[0.1em] text-ink/40">{messageLabel}</span>
              <textarea
                className="min-h-[120px] w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-coral/40 focus:bg-ink/[0.06]"
                name="message"
                placeholder={messagePlaceholder}
                required
              />
            </label>

            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4">
              {"error" in state && state.error ? (
                <p className="text-xs text-coral/80">{state.error}</p>
              ) : (
                <span />
              )}
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-soft transition hover:bg-amber-warm disabled:opacity-50"
              >
                {isPending ? "Sending..." : "Send message"}
                {!isPending && <span aria-hidden>↗</span>}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
