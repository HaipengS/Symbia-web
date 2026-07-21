"use client";

import { useEffect, useActionState } from "react";
import { useWaitlist } from "@/lib/waitlist-context";
import { joinWaitlist } from "@/app/actions/waitlist";

const initialState = { success: false as const, error: "" };

export default function WaitlistModal() {
  const { isOpen, close } = useWaitlist();
  const [state, formAction, isPending] = useActionState(joinWaitlist, initialState);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Join the Symbia waitlist"
    >
      {/* Backdrop — warm dim to match the earth palette */}
      <div
        className="absolute inset-0 bg-earth/50 backdrop-blur-sm"
        onClick={close}
      />

      {/* Panel — white card surface, same as the rest of the site */}
      <div className="card-surface relative z-10 w-full max-w-2xl rounded-2xl shadow-[0_32px_100px_rgba(36,26,18,0.25)]">
        {/* Coral top accent */}
        <div className="h-px w-full rounded-t-2xl bg-gradient-to-r from-coral/80 via-amber-warm/40 to-transparent" />

        <div className="p-12">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
                Early access
              </p>
              <h2 className="font-display text-4xl font-bold leading-tight text-ink">
                Join the waitlist
              </h2>
            </div>
            <button
              onClick={close}
              aria-label="Close"
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/40 transition hover:border-coral/40 hover:text-coral"
            >
              ✕
            </button>
          </div>

          {state.success ? (
            <div className="flex flex-col items-start gap-3 py-4">
              <span className="font-display text-5xl text-coral" aria-hidden>✓</span>
              <p className="font-display text-2xl font-bold text-ink">You&apos;re in.</p>
              <p className="text-sm leading-relaxed text-ink/60">
                We&apos;ll reach out as soon as we&apos;re ready. Thanks for being early.
              </p>
              <button
                onClick={close}
                className="mt-2 rounded-full border border-ink/20 px-5 py-2 text-xs uppercase tracking-[0.1em] text-ink/50 transition hover:border-coral/40 hover:text-coral"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="mb-8 text-base leading-relaxed text-ink/60">
                Be the first to know when Symbia bioleather is available — for
                makers, brands, and craftspeople ready to work with something new.
              </p>

              <form action={formAction} className="space-y-5">
                <label className="block space-y-2">
                  <span className="text-xs uppercase tracking-[0.1em] text-ink/45">
                    Name <span className="normal-case text-ink/25">(optional)</span>
                  </span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Rayden Yap"
                    className="w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-coral/40 focus:bg-ink/[0.06]"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs uppercase tracking-[0.1em] text-ink/45">
                    Email address
                  </span>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-coral/40 focus:bg-ink/[0.06]"
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
                  {isPending ? "Joining..." : "Join the waitlist →"}
                </button>

                <p className="text-center text-[11px] text-ink/25">
                  No spam. Unsubscribe at any time.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
