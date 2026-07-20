"use client";

import { useActionState } from "react";
import { joinWaitlist } from "@/app/actions/waitlist";

const initialState = { success: false as const, error: "" };

export default function WaitlistSection() {
  const [state, formAction, isPending] = useActionState(joinWaitlist, initialState);

  return (
    <section
      id="waitlist"
      className="w-full max-w-5xl text-left"
      aria-label="Join the Symbia waitlist"
    >
      {/* Coral top accent line */}
      <div className="mb-8 h-px w-full bg-gradient-to-r from-coral/60 via-amber-warm/30 to-transparent" />

      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        {/* Copy */}
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
            Early access
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Join the waitlist
          </h2>
          <p className="max-w-md text-base leading-relaxed text-ink/65">
            Be the first to know when Symbia bioleather is available — for
            makers, brands, and craftspeople ready to work with something new.
          </p>
          <ul className="space-y-2 text-sm text-ink/55">
            <li className="flex items-center gap-2">
              <span className="h-1 w-4 rounded-full bg-coral/60" />
              First access to material samples
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-4 rounded-full bg-coral/60" />
              Workshop &amp; training announcements
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-4 rounded-full bg-coral/60" />
              Partnership opportunities
            </li>
          </ul>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-ink/15 bg-earth/40 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur">
          {state.success ? (
            <div className="flex flex-col items-start gap-3 py-4">
              <span className="font-display text-3xl text-coral" aria-hidden>✓</span>
              <p className="font-display text-xl font-bold text-ink">You&apos;re in.</p>
              <p className="text-sm text-ink/60">
                We&apos;ll reach out as soon as we&apos;re ready. Thanks for being early.
              </p>
            </div>
          ) : (
            <form action={formAction} className="space-y-4">
              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.1em] text-ink/50">
                  Name <span className="normal-case text-ink/30">(optional)</span>
                </span>
                <input
                  name="name"
                  type="text"
                  placeholder="Rayden Yap"
                  className="w-full rounded-xl border border-ink/15 bg-black/25 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/25 focus:border-coral/50 focus:bg-black/15"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.1em] text-ink/50">
                  Email address
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-ink/15 bg-black/25 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/25 focus:border-coral/50 focus:bg-black/15"
                />
              </label>

              {state.error ? (
                <p className="text-xs text-coral/80">{state.error}</p>
              ) : null}

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-full border border-coral/60 bg-coral/10 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-coral transition hover:bg-coral hover:text-soft disabled:opacity-50"
              >
                {isPending ? "Joining..." : "Join the waitlist"}
              </button>

              <p className="text-center text-[11px] text-ink/30">
                No spam. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
