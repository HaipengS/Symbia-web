"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Curated editorial "band" grid — a luxury-lookbook layout, NOT a Pinterest waterfall.
 * The gallery is composed of stacked full-width bands (feature / trio / duo). Each band
 * is a self-contained CSS-grid rectangle, so the whole always finishes as a clean
 * rectangle with a flat bottom edge, and every band collapses gracefully on mobile.
 * Image emphasis (hero vs supporting) is assigned by hand, not by an algorithm.
 */

export type Band =
  | { variant: "featureL" | "featureR" | "trio"; items: GalleryImage[] } // 3 images
  | { variant: "duo"; items: GalleryImage[] }; // 2 images

const BANDS: Record<Band["variant"], { grid: string; cells: string[] }> = {
  // Big image left, two supporting stacked on the right.
  featureL: {
    grid: "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4",
    cells: [
      "col-span-2 aspect-[3/4] md:col-span-2 md:row-span-2 md:aspect-auto",
      "aspect-[3/4]",
      "aspect-[3/4]",
    ],
  },
  // Two supporting stacked on the left, big image right (big rendered first).
  featureR: {
    grid: "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4",
    cells: [
      "col-span-2 aspect-[3/4] md:col-span-2 md:row-span-2 md:col-start-2 md:row-start-1 md:aspect-auto",
      "aspect-[3/4]",
      "aspect-[3/4]",
    ],
  },
  // Three equal products in a row (first goes full-width on mobile to stay rectangular).
  trio: {
    grid: "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4",
    cells: ["col-span-2 aspect-[3/4] md:col-span-1", "aspect-[3/4]", "aspect-[3/4]"],
  },
  // Two equal images.
  duo: {
    grid: "grid grid-cols-2 gap-3 md:gap-4",
    cells: ["aspect-[3/4]", "aspect-[3/4]"],
  },
};

function Tile({
  img,
  className,
  onOpen,
}: {
  img: GalleryImage;
  className: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${img.alt}`}
      className={`group relative block overflow-hidden rounded-xl bg-cream/40 outline-none ring-coral/70 transition duration-300 hover:shadow-[0_18px_44px_rgba(36,26,18,0.13)] focus-visible:ring-2 md:rounded-2xl ${className}`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(min-width:768px) 34vw, 50vw"
        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
      />
    </button>
  );
}

export default function ProductGallery({ bands }: { bands: Band[] }) {
  const flat = bands.flatMap((b) => b.items);
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + flat.length) % flat.length)),
    [flat.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    // Fade the navbar out for an immersive view; restore smoothly on close.
    const nav = document.querySelector<HTMLElement>("nav");
    if (nav) {
      nav.style.transition = "opacity 300ms ease";
      nav.style.opacity = "0";
      nav.style.pointerEvents = "none";
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (nav) {
        nav.style.opacity = "";
        nav.style.pointerEvents = "";
      }
    };
  }, [open, close, step]);

  const current = open ? flat[index] : null;
  let running = 0; // flat index, assigned in render order

  return (
    <>
      <div className="flex flex-col gap-3 md:gap-4">
        {bands.map((band, bi) => {
          const spec = BANDS[band.variant];
          return (
            <div key={bi} className={spec.grid}>
              {band.items.map((img, ci) => {
                const flatIndex = running++;
                return (
                  <Tile
                    key={img.src}
                    img={img}
                    className={spec.cells[ci] ?? "aspect-[3/4]"}
                    onOpen={() => setIndex(flatIndex)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ── Lightbox ──
          Portaled to <body> so it escapes the gallery <main>'s stacking context
          (which otherwise traps it below the fixed navbar). z-[1000] > navbar. */}
      {open &&
        current &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
          >
            <div
              className="absolute inset-0 bg-earth/85 backdrop-blur-md"
              onClick={close}
            />

            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-soft/90 text-lg text-earth transition hover:bg-soft md:right-8 md:top-8"
            >
              ✕
            </button>
            <button
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-soft/85 text-2xl leading-none text-earth transition hover:bg-soft md:left-6"
            >
              ‹
            </button>
            <button
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-soft/85 text-2xl leading-none text-earth transition hover:bg-soft md:right-6"
            >
              ›
            </button>

            <figure className="relative z-10 flex max-h-full flex-col items-center gap-3">
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                priority
                className="max-h-[82vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <figcaption className="text-xs uppercase tracking-[0.14em] text-soft/70">
                {index! + 1} / {flat.length}
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </>
  );
}
