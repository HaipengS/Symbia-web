"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryImage } from "@/data/galleryImages";

/**
 * Dense mosaic gallery. A 12-column CSS grid (4 on mobile) with `grid-auto-flow: dense`
 * and hand-assigned per-image tile spans → a wide, near-full-width, irregular archive
 * that packs tightly. Sizes come from the data (deterministic — stable across renders),
 * every tile is an independent button → portaled lightbox. object-cover + per-image
 * focal points handle the crops that varied tile ratios introduce.
 */

// Every tile is a multiple of a base unit (desktop 3×4, mobile 2×2) — large/wide/tall
// are exact 2× extensions — so the dense grid packs into a clean rectangle instead of
// leaving a ragged, holey bottom.
const tileClasses: Record<GalleryImage["size"], string> = {
  small: "col-span-2 row-span-2 md:col-span-3 md:row-span-4",
  medium: "col-span-2 row-span-2 md:col-span-3 md:row-span-4",
  tall: "col-span-2 row-span-4 md:col-span-3 md:row-span-8",
  wide: "col-span-4 row-span-2 md:col-span-6 md:row-span-4",
  large: "col-span-4 row-span-4 md:col-span-6 md:row-span-8",
};

export default function MosaicGallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) =>
      setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
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

  const current = open ? images[index] : null;

  return (
    <>
      <div className="grid auto-rows-[24vw] grid-cols-4 gap-1 [grid-auto-flow:dense] md:auto-rows-[8.3vw] md:grid-cols-12 md:gap-1.5">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open ${img.alt}`}
            className={`group relative block overflow-hidden bg-cream/40 outline-none ring-coral/70 transition focus-visible:z-10 focus-visible:ring-2 ${tileClasses[img.size]}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i < 6}
              sizes="(max-width:768px) 50vw, 22vw"
              style={{ objectPosition: img.objectPosition ?? "50% 50%" }}
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {/* ── Lightbox (portaled above the navbar) ── */}
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
                {index! + 1} / {images.length}
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </>
  );
}
