"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent, type ReactNode } from "react";
import { useWaitlist } from "@/lib/waitlist-context";

/**
 * One navbar, two modes:
 *   - "static"  (default) — a visible, sticky frosted bar for every page except home.
 *   - "animated" — the home hero bar. It renders an empty logo slot + data-intro-*
 *     hooks; components/LogoIntro.tsx drives its opacity / pointer-events from scroll
 *     progress and docks the shared logo into the slot.
 * Links, CTA, spacing and typography are shared so the two never drift apart.
 *
 * Below 1024 the links collapse into a panel. Six of them plus the waitlist button
 * measure about 850px next to the mark, so they stop fitting somewhere near 900;
 * the bar carried five and no fallback at all before Impact and Contact joined it.
 */

type NavLink = { href: string; label: string; type: "section" | "route" };

// Section links (#…) live on the home scroll; route links are dedicated pages.
// Contact became a route rather than a home anchor because the brief asks for a
// separate page that does not send you back to the home page. Impact was reachable
// only from the footer until now.
const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home", type: "section" },
  { href: "/about", label: "About", type: "route" },
  { href: "/impact", label: "Impact", type: "route" },
  { href: "/research", label: "Research", type: "route" },
  { href: "/gallery", label: "Gallery", type: "route" },
  { href: "/contact", label: "Contact", type: "route" },
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
  // The navbar survives a route change, so the panel has to close itself on one.
  // Storing the path it was opened at derives that instead of watching for it: any
  // navigation, including the mark and the browser's own back button, makes the
  // stored path stale and the panel shut.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const menuOpen = openedAt === pathname;
  const closeMenu = () => setOpenedAt(null);

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

  const renderLinks = (onNavigate?: () => void) =>
    NAV_LINKS.map((l) => {
      const active = isActive(l);
      return (
        <Link
          key={l.href}
          href={hrefFor(l)}
          onClick={(e) => {
            if (l.type === "section") scrollToSection(l.href.slice(1))(e);
            onNavigate?.();
          }}
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

  const linkGroup =
    "hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.14em]";

  /** Hamburger plus the panel it opens. Hidden from 1024 up, where the bar fits. */
  const renderMobile = (source: string) => (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpenedAt(menuOpen ? null : pathname)}
        aria-expanded={menuOpen}
        aria-controls="navbar-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
      >
        <span
          className={cx(
            "block h-px w-5 bg-earth transition-transform duration-200",
            menuOpen && "translate-y-[3px] rotate-45",
          )}
        />
        <span
          className={cx(
            "block h-px w-5 bg-earth transition-transform duration-200",
            menuOpen && "-translate-y-[3px] -rotate-45",
          )}
        />
      </button>

      {/* Opaque, not translucent: at 95% the heading behind it stayed legible
          through the links. */}
      {menuOpen && (
        <div
          id="navbar-menu"
          className="absolute inset-x-0 top-full border-b border-earth/10 bg-soft px-6 pb-8 pt-2 md:px-10"
        >
          <div className="mx-auto flex w-full max-w-[1720px] flex-col items-start gap-5 text-sm uppercase tracking-[0.14em]">
            {renderLinks(closeMenu)}
            <button
              onClick={() => {
                closeMenu();
                open(source);
              }}
              className={cx(CTA_CLASS, "mt-2")}
            >
              Join waitlist
            </button>
          </div>
        </div>
      )}
    </div>
  );

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
            <button
              onClick={() => open("navbar-home")}
              className={cx(CTA_CLASS, "hidden lg:inline-flex")}
            >
              Join waitlist
            </button>
            {renderMobile("navbar-home")}
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
          <button
            onClick={() => open("navbar")}
            className={cx(CTA_CLASS, "hidden lg:inline-flex")}
          >
            Join waitlist
          </button>
          {renderMobile("navbar")}
        </div>
      </div>
    </nav>
  );
}
