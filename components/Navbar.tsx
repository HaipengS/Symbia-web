"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, type ReactNode } from "react";
import { useWaitlist } from "@/lib/waitlist-context";

/**
 * One navbar, two modes:
 *   - "static"  (default) — a visible, sticky frosted bar for every page except home.
 *   - "animated" — the home hero bar. It renders an empty logo slot + data-intro-*
 *     hooks; components/LogoIntro.tsx drives its opacity / pointer-events from scroll
 *     progress and docks the shared logo into the slot.
 * Links, CTA, spacing and typography are shared so the two never drift apart.
 */

type NavLink = { href: string; label: string; type: "section" | "route" };

// Section links (#…) live on the home scroll; route links are dedicated pages.
const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home", type: "section" },
  { href: "/about", label: "About", type: "route" },
  { href: "/research", label: "Research", type: "route" },
  { href: "/gallery", label: "Gallery", type: "route" },
  { href: "#contact", label: "Contact", type: "section" },
];

const CTA_CLASS =
  "rounded-full border border-coral/50 bg-coral/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-coral transition hover:bg-coral hover:text-soft";

function cx(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export default function Navbar({
  mode = "static",
  logoMark,
}: {
  mode?: "static" | "animated";
  /** The static navbar's logo (the same SVG wordmark mark the home navbar docks). */
  logoMark?: ReactNode;
}) {
  const { open } = useWaitlist();
  const pathname = usePathname();
  const onHome = pathname === "/";

  // Section links scroll on the home page; off home they route to the home anchor.
  const hrefFor = (l: NavLink) =>
    l.type === "route" ? l.href : onHome ? l.href : `/${l.href}`;

  const scrollToSection =
    (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!onHome) return; // off home, let the Link navigate to /#id
      event.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

  const isActive = (l: NavLink) =>
    l.type === "route" ? pathname === l.href : l.href === "#home" && onHome;

  const renderLinks = () =>
    NAV_LINKS.map((l) => {
      const active = isActive(l);
      return (
        <Link
          key={l.href}
          href={hrefFor(l)}
          onClick={l.type === "section" ? scrollToSection(l.href.slice(1)) : undefined}
          aria-current={active ? "page" : undefined}
          className={cx(
            "transition-colors hover:text-earth",
            active ? "text-earth" : "text-earth/55",
          )}
        >
          {l.label}
        </Link>
      );
    });

  const linkGroup = "flex items-center gap-7 text-xs uppercase tracking-[0.14em]";

  // ── Animated mode (home hero) — LogoIntro drives opacity/pointer-events ──
  if (mode === "animated") {
    return (
      <nav
        data-intro-nav
        inert
        className="fixed inset-x-0 top-0 z-30 border-b border-earth/10 bg-soft/80 px-6 py-3 backdrop-blur-xl md:px-10 lg:px-14 transition-opacity duration-300 ease-out motion-reduce:transition-none"
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <div className="mx-auto flex w-full max-w-[1720px] items-center justify-between">
          {/* Empty logo slot — the shared clone docks here (sized by LogoIntro). */}
          <Link
            href="/"
            aria-label="Symbia home"
            data-navbar-logo-slot
            className="navbar-logo-slot"
            style={{ display: "inline-flex", alignItems: "center", lineHeight: 0 }}
          />
          <div
            data-intro-links
            className="flex items-center gap-7"
            style={{ opacity: 0, pointerEvents: "none" }}
          >
            <div className={linkGroup}>{renderLinks()}</div>
            <button onClick={open} className={CTA_CLASS}>
              Join waitlist
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // ── Static mode (every other page) ──
  return (
    <nav className="sticky top-0 z-30 border-b border-earth/10 bg-soft/80 px-6 py-3 backdrop-blur-xl md:px-10 lg:px-14">
      <div className="mx-auto flex w-full max-w-[1720px] items-center justify-between">
        <Link
          href="/"
          aria-label="Symbia home"
          className="inline-flex items-center transition-opacity hover:opacity-70"
        >
          {logoMark ?? (
            <span className="font-display text-lg font-bold tracking-tight text-earth">
              Symbia
            </span>
          )}
        </Link>
        <div className="flex items-center gap-7">
          <div className={linkGroup}>{renderLinks()}</div>
          <button onClick={open} className={CTA_CLASS}>
            Join waitlist
          </button>
        </div>
      </div>
    </nav>
  );
}
