"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { useWaitlist } from "@/lib/waitlist-context";

type NavLink = {
  href: string;
  label: string;
  type: "section" | "route";
};

const navLinks: NavLink[] = [
  { href: "#home", label: "Home", type: "section" },
  { href: "/about", label: "About", type: "route" },
  { href: "#contact", label: "Contact", type: "section" },
];

/** How far the hero must scroll away before the bar slides in, as a share of the viewport. */
const REVEAL_AT = 0.75;

type NavbarProps = {
  onHomePage?: boolean;
  /** "light" is the frosted bar for the white logo hero; "dark" rides the leather background. */
  variant?: "dark" | "light";
  /** Hold the bar off-screen until the hero has scrolled past, then slide it in. */
  revealAfterHero?: boolean;
  /**
   * Intro-controlled mode (the scroll-linked logo hero transition). LogoIntro drives
   * the bar's opacity/pointer-events and the links' opacity imperatively (keyed to
   * scroll progress) via the `data-intro-nav` / `data-intro-links` hooks, so nothing
   * here re-renders on scroll. The logo slot is empty — the single shared logo is a
   * fixed clone that parks over it — but sized/measured by LogoIntro.
   */
  introControlled?: boolean;
};

function joinClassNames(...classNames: Array<string | false | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export default function Navbar({
  onHomePage = false,
  variant = "dark",
  revealAfterHero = false,
  introControlled = false,
}: NavbarProps) {
  const { open } = useWaitlist();
  const [scrollRevealed, setScrollRevealed] = useState(!revealAfterHero);

  useEffect(() => {
    if (!revealAfterHero || introControlled) return;

    // Re-runs on every scroll frame, but React bails out unless the boundary is crossed.
    const syncRevealed = () =>
      setScrollRevealed(window.scrollY > window.innerHeight * REVEAL_AT);

    syncRevealed();
    window.addEventListener("scroll", syncRevealed, { passive: true });

    return () => window.removeEventListener("scroll", syncRevealed);
  }, [revealAfterHero, introControlled]);

  const handleNavClick =
    (id?: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!id) return;
      event.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

  const renderLinks = (linkClass: string, hoverClass: string) =>
    navLinks.map((link) => {
      const href =
        link.type === "section"
          ? `${onHomePage ? "" : "/"}${link.href}`
          : link.href;
      return (
        <Link
          key={link.href}
          className={joinClassNames("transition-colors", hoverClass)}
          href={href}
          onClick={
            onHomePage && link.type === "section"
              ? handleNavClick(link.href.slice(1))
              : undefined
          }
        >
          {link.label}
        </Link>
      );
    });

  // ── Intro-controlled bar (scroll-linked logo hero transition) ──
  // Opacity / pointer-events are written imperatively by LogoIntro on scroll, via
  // the data-intro-* hooks — no React state, so it never lags the scroll.
  if (introControlled) {
    return (
      <nav
        data-intro-nav
        inert
        className="fixed inset-x-0 top-0 z-30 border-b border-earth/10 bg-soft/80 px-6 py-3 backdrop-blur-xl"
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          {/* Empty logo slot — the single shared logo (a fixed clone) parks here.
              LogoIntro sizes it and measures it as the progress-1 target. */}
          <Link
            href="/"
            aria-label="Symbia home"
            data-navbar-logo-slot
            className="navbar-logo-slot"
            style={{ display: "inline-flex", alignItems: "center", lineHeight: 0 }}
          />

          {/* Links + CTA — opacity/pointer-events driven by scroll progress. */}
          <div
            data-intro-links
            className="flex items-center gap-7"
            style={{ opacity: 0, pointerEvents: "none" }}
          >
            <div className="flex items-center gap-7 text-xs uppercase tracking-[0.14em] text-earth/55">
              {renderLinks("", "hover:text-earth")}
            </div>
            <button
              onClick={open}
              className="rounded-full border border-coral/50 bg-coral/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-coral transition hover:bg-coral hover:text-soft"
            >
              Join waitlist
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // ── Default bar ──
  const isLight = variant === "light";
  const hidden = revealAfterHero && !scrollRevealed;

  return (
    <nav
      // `inert` keeps the hidden bar out of the tab order without killing the slide-out.
      inert={hidden}
      className={joinClassNames(
        "z-30 px-6",
        revealAfterHero
          ? "fixed inset-x-0 top-0 transition duration-500 ease-out motion-reduce:transition-none"
          : "sticky top-0",
        hidden && "pointer-events-none -translate-y-full opacity-0",
        isLight
          ? "border-b border-earth/10 bg-soft/80 py-3 backdrop-blur-xl"
          : "pt-5 pb-3",
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className={joinClassNames(
            "font-display text-lg font-bold tracking-tight transition-colors hover:text-coral",
            isLight ? "text-earth" : "text-ink",
          )}
        >
          Symbia
        </Link>

        {/* Links */}
        <div
          className={joinClassNames(
            "flex items-center gap-7 text-xs uppercase tracking-[0.14em]",
            isLight ? "text-earth/55" : "text-ink/50",
          )}
        >
          {renderLinks("", isLight ? "hover:text-earth" : "hover:text-ink")}
        </div>

        {/* CTA */}
        <button
          onClick={open}
          className="rounded-full border border-coral/50 bg-coral/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-coral transition hover:bg-coral hover:text-soft"
        >
          Join waitlist
        </button>
      </div>
    </nav>
  );
}
