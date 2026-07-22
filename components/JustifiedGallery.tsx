"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

/**
 * EXPERIMENT — wide justified (Flickr/Google-Photos style) gallery.
 *
 * Images are packed into full-width rows that share a height; each image's width
 * comes from its own aspect ratio, so a completed row's right edge aligns cleanly
 * and images are NOT cropped (cell ratio == image ratio). Custom greedy row math
 * (no dependency), recalculated on container resize. Mobile falls back to a dense
 * 2-column grid. Isolated to /gallery — nothing global changes; the previous
 * ProductGallery component is kept intact for an easy restore.
 */

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
};

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Row height + gap by container width (desktop dense, mobile → 2-col grid).
// Targets run taller than a typical justified gallery because this set is all
// portrait — keeps rows at ~4-6 sizeable images instead of many narrow ones.
function paramsFor(w: number) {
  if (w < 640) return { mode: "grid" as const, target: 0, gap: 4 };
  if (w < 1024) return { mode: "rows" as const, target: 250, gap: 5 };
  if (w < 1536) return { mode: "rows" as const, target: 340, gap: 6 };
  return { mode: "rows" as const, target: 380, gap: 6 };
}

type Row = { items: { img: GalleryImage; index: number }[]; height: number };

// Balanced justified packing. A plain greedy fill starves the last row (e.g. 7+7+2),
// which then either stretches hugely or leaves an awkward gap. Instead: estimate the
// row count from the target height, split the images so every row carries a similar
// aspect-ratio sum, and solve each row's shared height to fill the width — so all
// rows (including the last) have clean right edges and similar heights.
function computeRows(
  images: GalleryImage[],
  width: number,
  target: number,
  gap: number,
): Row[] {
  if (width <= 0 || images.length === 0) return [];
  const ars = images.map((i) => i.width / i.height);
  const totalAR = ars.reduce((a, b) => a + b, 0);
  const rowCount = Math.max(1, Math.round((totalAR * target) / width));
  const perRow = totalAR / rowCount;

  const rows: Row[] = [];
  let items: { img: GalleryImage; index: number }[] = [];
  let arSum = 0;
  const finalize = (its: typeof items, s: number): Row => ({
    items: its,
    height: (width - (its.length - 1) * gap) / s,
  });

  images.forEach((img, index) => {
    items.push({ img, index });
    arSum += ars[index];
    if (index === images.length - 1) {
      rows.push(finalize(items, arSum));
      return;
    }
    if (rows.length < rowCount - 1 && arSum >= perRow) {
      // Boundary choice: is the row closer to `perRow` with or without this image?
      const without = arSum - ars[index];
      if (items.length > 1 && Math.abs(without - perRow) < Math.abs(arSum - perRow)) {
        const spill = items.pop()!;
        rows.push(finalize(items, without));
        items = [spill];
        arSum = ars[index];
      } else {
        rows.push(finalize(items, arSum));
        items = [];
        arSum = 0;
      }
    }
  });
  return rows;
}

function Tile({
  img,
  index,
  style,
  priority,
  onOpen,
}: {
  img: GalleryImage;
  index: number;
  style: React.CSSProperties;
  priority?: boolean;
  onOpen: (i: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open ${img.alt}`}
      style={style}
      className="group relative block overflow-hidden bg-cream/40 outline-none ring-coral/70 transition focus-visible:ring-2"
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        priority={priority}
        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 24vw"
        style={{ objectPosition: img.objectPosition ?? "50% 50%" }}
        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
      />
    </button>
  );
}

export default function JustifiedGallery({ images }: { images: GalleryImage[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  // Measure container width (before paint) and track resize.
  useIso(() => {
    const el = containerRef.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { mode, target, gap } = paramsFor(width || 1280);
  const rows = useMemo(
    () => (mode === "rows" ? computeRows(images, width, target, gap) : []),
    [images, width, mode, target, gap],
  );
  const firstRowCount = rows[0]?.items.length ?? 4;

  // ── Lightbox ──
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
    <div ref={containerRef} className="w-full">
      {mode === "grid" ? (
        // Mobile: dense 2-column grid, natural per-image heights.
        <div className="grid grid-cols-2" style={{ gap }}>
          {images.map((img, i) => (
            <Tile
              key={img.src}
              img={img}
              index={i}
              priority={i < 2}
              onOpen={setIndex}
              style={{ aspectRatio: `${img.width} / ${img.height}` }}
            />
          ))}
        </div>
      ) : (
        // Desktop/tablet: justified rows.
        <div className="flex flex-col" style={{ gap }}>
          {rows.map((row, ri) => (
            <div key={ri} className="flex" style={{ gap }}>
              {row.items.map(({ img, index: fi }) => (
                <Tile
                  key={img.src}
                  img={img}
                  index={fi}
                  priority={fi < firstRowCount}
                  onOpen={setIndex}
                  style={{
                    width: row.height * (img.width / img.height),
                    height: row.height,
                    flex: "0 0 auto",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

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
    </div>
  );
}
