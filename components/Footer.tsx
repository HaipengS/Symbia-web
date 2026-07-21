import Link from "next/link";
import type { ReactNode } from "react";

type Social = {
  label: string;
  icon: ReactNode;
  // href intentionally omitted for now — links get wired in later.
};

const socials: Social[] = [
  {
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M7 10v7M7 7.5v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="m4 7 8 6 8-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-7">
        <Link
          href="/"
          aria-label="Symbia home"
          className="font-display text-lg font-bold tracking-tight text-ink transition-colors hover:text-coral"
        >
          Symbia
        </Link>

        {/* Decorative until real social URLs are wired — not announced as links. */}
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <span
              key={s.label}
              title={s.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/60"
            >
              {s.icon}
            </span>
          ))}
        </div>

        <p className="text-xs uppercase tracking-[0.14em] text-ink/35">
          © 2026 Symbia
        </p>
      </div>
    </footer>
  );
}
