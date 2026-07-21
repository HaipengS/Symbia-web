"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Scroll-linked hero ⇄ navbar shared-element transition.
 *
 * On first load the wordmark plays its per-letter drop (time-based) and settles at
 * the hero resting position. From then on a SINGLE fixed clone is the logo, and its
 * position/scale/rotation — plus the navbar background, links and pointer-events —
 * are a pure function of scroll progress:
 *
 *     progress = clamp(scrollY / heroHeight, 0, 1)
 *
 * There is no independent playback: the transition is scrubbed. Stop scrolling and
 * everything stops; reverse and it reverses on the same frame. Updates are written
 * imperatively (rAF-throttled) so nothing re-renders or lags behind the scroll.
 */

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Mirrors the drop animation in globals.css (.symbia-drop-letter).
const LETTER_DURATION_MS = 1150;
const LETTER_STAGGER_MS = 100;
const DROP_BUFFER_MS = 120;

// Resting on-screen height of the wordmark once parked in the navbar.
const NAVBAR_LOGO_HEIGHT = 22;

// Progress sub-ranges (spec §Navbar / §Navigation Links / §Pointer Events).
const NAV_BG_IN = [0.05, 0.35] as const; // background fades in over this range
const LINKS_IN = [0.35, 0.7] as const; // links fade in a beat later
const POINTER_AT = 0.7; // navbar becomes interactive past this

type Box = { x: number; y: number; width: number; height: number };
type Rect = { cx: number; cy: number; w: number; angle: number };

type LogoIntroProps = {
  heroLogo: ReactNode;
  flyingLogo: ReactNode;
  children: ReactNode;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mapRange = (v: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  outMin + clamp((v - inMin) / (inMax - inMin), 0, 1) * (outMax - outMin);

function trimSvgToContent(svg: SVGSVGElement | null, bbox: Box) {
  if (!svg) return;
  svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
}

export default function LogoIntro({ heroLogo, flyingLogo, children }: LogoIntroProps) {
  const [cloneReady, setCloneReady] = useState(false);
  const [heroHidden, setHeroHidden] = useState(false);

  const heroSectionRef = useRef<HTMLElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef<HTMLDivElement>(null);

  const heroRestRef = useRef<Rect | null>(null); // logo rect at progress 0 (scrollY=0)
  const navbarRectRef = useRef<Rect | null>(null); // logo rect at progress 1 (navbar slot)
  const baseRef = useRef<{ w: number; h: number; bbox: Box } | null>(null);
  const heroHeightRef = useRef(0);
  const reducedRef = useRef(false);
  const tickingRef = useRef(false);

  const timersRef = useRef<number[]>([]);
  const unlockRef = useRef<(() => void) | null>(null);
  const listenersRef = useRef<(() => void) | null>(null);

  const addTimer = (fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // ── Scroll lock while the opening drop plays ──
  const lockScroll = () => {
    const keys = new Set([" ", "PageUp", "PageDown", "ArrowUp", "ArrowDown", "Home", "End"]);
    const prevent = (e: Event) => e.preventDefault();
    const preventKeys = (e: KeyboardEvent) => keys.has(e.key) && e.preventDefault();
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    window.addEventListener("keydown", preventKeys, { passive: false });
    unlockRef.current = () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      window.removeEventListener("keydown", preventKeys);
    };
  };
  const unlockScroll = () => {
    unlockRef.current?.();
    unlockRef.current = null;
  };

  // ── Measurement ──
  const heroSvg = () => heroLogoRef.current?.querySelector("svg") ?? null;
  const slotEl = () => document.querySelector<HTMLElement>("[data-navbar-logo-slot]");
  const navEl = () => document.querySelector<HTMLElement>("[data-intro-nav]");
  const linksEl = () => document.querySelector<HTMLElement>("[data-intro-links]");

  // The hero wordmark's on-screen rect (respects the -4° tilt + stage transform),
  // even while visibility:hidden.
  const measureHero = (): (Rect & { h: number; bbox: Box }) | null => {
    const svg = heroSvg();
    if (!svg) return null;
    let bb: DOMRect;
    try {
      bb = svg.getBBox();
    } catch {
      return null;
    }
    const ctm = svg.getScreenCTM();
    if (!ctm || bb.width === 0 || bb.height === 0) return null;
    const sx = Math.hypot(ctm.a, ctm.b);
    const sy = Math.hypot(ctm.c, ctm.d);
    const c = new DOMPoint(bb.x + bb.width / 2, bb.y + bb.height / 2).matrixTransform(ctm);
    return {
      cx: c.x,
      cy: c.y,
      w: bb.width * sx,
      h: bb.height * sy,
      angle: (Math.atan2(ctm.b, ctm.a) * 180) / Math.PI,
      bbox: { x: bb.x, y: bb.y, width: bb.width, height: bb.height },
    };
  };

  // (Re)measure both endpoints. heroRest is stored in scrollY=0 coordinates (add the
  // current scroll offset), so it's correct no matter where we measure from.
  const recompute = () => {
    const hero = measureHero();
    if (hero) {
      baseRef.current = { w: hero.w, h: hero.h, bbox: hero.bbox };
      heroRestRef.current = {
        cx: hero.cx,
        cy: hero.cy + window.scrollY,
        w: hero.w,
        angle: hero.angle,
      };
      const aspect = hero.bbox.width / hero.bbox.height;
      const slot = slotEl();
      if (slot) {
        slot.style.width = `${NAVBAR_LOGO_HEIGHT * aspect}px`;
        slot.style.height = `${NAVBAR_LOGO_HEIGHT}px`;
        const r = slot.getBoundingClientRect();
        navbarRectRef.current = {
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          w: r.width,
          angle: 0,
        };
      }
    }
    heroHeightRef.current =
      heroSectionRef.current?.offsetHeight || window.innerHeight || 1;
    return !!hero;
  };

  // ── The scrubbed frame: everything is a function of scroll progress ──
  const update = () => {
    const el = flightRef.current;
    const hr = heroRestRef.current;
    const nr = navbarRectRef.current;
    const base = baseRef.current;
    if (!el || !hr || !nr || !base) return;

    let p = clamp(window.scrollY / (heroHeightRef.current || 1), 0, 1);
    if (reducedRef.current) p = p >= 0.5 ? 1 : 0; // reduced motion: snap, no scrub

    const cx = lerp(hr.cx, nr.cx, p);
    const cy = lerp(hr.cy, nr.cy, p);
    const w = lerp(hr.w, nr.w, p);
    const angle = lerp(hr.angle, nr.angle, p);
    el.style.transform = `translate(${cx - base.w / 2}px, ${
      cy - base.h / 2
    }px) scale(${w / base.w}) rotate(${angle}deg)`;

    const nav = navEl();
    if (nav) {
      const active = p > POINTER_AT;
      nav.style.opacity = String(mapRange(p, NAV_BG_IN[0], NAV_BG_IN[1], 0, 1));
      nav.style.pointerEvents = active ? "auto" : "none";
      nav.inert = !active;
    }
    const links = linksEl();
    if (links) {
      links.style.opacity = String(mapRange(p, LINKS_IN[0], LINKS_IN[1], 0, 1));
      links.style.pointerEvents = p > POINTER_AT ? "auto" : "none";
    }
  };

  const requestUpdate = () => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      tickingRef.current = false;
      update();
    });
  };

  // Set the persistent clone up once the geometry is known.
  useIsoLayoutEffect(() => {
    if (!cloneReady) return;
    const el = flightRef.current;
    const base = baseRef.current;
    if (!el || !base) return;
    const svg = el.querySelector("svg");
    if (svg) {
      // The Logo SVG carries internal ids (clipPaths). This is a SECOND copy in the
      // DOM, so its ids collide with the hero's; `url(#id)` would resolve to the hero
      // copy's clip — and since the hero is visibility:hidden, the clone gets clipped
      // to nothing. Namespace this copy's ids so it clips against itself.
      svg.innerHTML = svg.innerHTML
        .replace(/id="([^"]+)"/g, 'id="$1-clone"')
        .replace(/url\(#([^)]+)\)/g, "url(#$1-clone)")
        .replace(/(xlink:href|href)="#([^"]+)"/g, '$1="#$2-clone"');
      trimSvgToContent(svg, base.bbox);
      svg.style.width = "100%";
      svg.style.height = "100%";
      svg.style.display = "block";
      const stage = svg.parentElement as HTMLElement | null;
      if (stage) {
        stage.style.width = "100%";
        stage.style.height = "100%";
        stage.style.aspectRatio = "auto";
        stage.style.display = "block";
        stage.style.minHeight = "0";
      }
    }
    // Base box = hero size, so the clone only ever scales DOWN from it (stays crisp).
    el.style.position = "fixed";
    el.style.left = "0";
    el.style.top = "0";
    el.style.zIndex = "50";
    el.style.pointerEvents = "none";
    el.style.lineHeight = "0";
    el.style.willChange = "transform";
    el.style.transformOrigin = "center center";
    el.style.width = `${base.w}px`;
    el.style.height = `${base.h}px`;
    el.style.opacity = "1";
    update(); // position at the current scroll position (progress 0 on first load)
  }, [cloneReady]);

  // ── Boot ──
  const attachListeners = () => {
    const onScroll = () => requestUpdate();
    const onResize = () => {
      recompute();
      requestUpdate();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    listenersRef.current = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  };

  // Measure (retry until the SVG is laid out), hand the logo to the fixed clone,
  // then wire up scroll scrubbing.
  const enableScrub = (attempt = 0) => {
    if (!recompute()) {
      if (attempt < 30) addTimer(() => enableScrub(attempt + 1), 40);
      return;
    }
    setHeroHidden(true); // the clone is the logo from here on
    setCloneReady(true);
    attachListeners();
  };

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedRef.current) {
      enableScrub(); // drop is disabled by CSS; go straight to scrubbing (snapped)
      return cleanup;
    }

    lockScroll();
    const letters =
      heroLogoRef.current?.querySelectorAll(".symbia-drop-letter").length ?? 6;
    const dropMs =
      Math.max(0, letters - 1) * LETTER_STAGGER_MS + LETTER_DURATION_MS + DROP_BUFFER_MS;

    addTimer(() => {
      unlockScroll();
      enableScrub();
    }, dropMs);
    addTimer(unlockScroll, dropMs + 2000); // failsafe

    return cleanup;

    function cleanup() {
      clearTimers();
      unlockScroll();
      listenersRef.current?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white">
      <Navbar mode="animated" />

      <main>
        {/* ── Logo hero: wallet + wordmark share one scaling stage ── */}
        <section ref={heroSectionRef} className="logo-wallet-scene" id="home">
          <div className="hero-stage">
            <Image
              src="/Font/wallet.png"
              alt="Symbia bioleather wallet"
              fill
              priority
              unoptimized
              className="wallet-product-image object-cover"
              sizes="100vw"
            />
            <div
              ref={heroLogoRef}
              className="hero-logo-placement"
              style={{ visibility: heroHidden ? "hidden" : "visible" }}
            >
              {heroLogo}
            </div>
          </div>
        </section>

        {/* ── White content below the hero ── */}
        <div className="relative text-ink">{children}</div>
      </main>

      {/* The single shared logo — a fixed clone scrubbed by scroll progress. */}
      {cloneReady && (
        <div ref={flightRef} data-logo-clone aria-hidden="true">
          {flyingLogo}
        </div>
      )}
    </div>
  );
}
