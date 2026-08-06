import Image from "next/image";
import Link from "next/link";
import MosaicGallery from "@/components/MosaicGallery";
import { galleryImages } from "@/data/galleryImages";

export const metadata = {
  title: "Gallery | Symbia",
  description:
    "A continuously growing visual archive of Symbia products, collaborations, and everyday moments.",
};

export default function GalleryPage() {
  return (
    <>
      {/* ── Editorial header, left-aligned on the mosaic's left edge (same px token) ── */}
      <header className="px-2 pb-6 pt-8 md:px-3 md:pb-7 md:pt-10">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-warm/70">
          Visual archive
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
          Products, collaborations &amp; everyday moments
        </h1>
        <p className="mt-3 max-w-2xl font-sans text-base leading-7 text-ink/60 md:text-lg">
          A continuously growing collection of Symbia products, people, workshops,
          and events, from our studio and our work in the field.
        </p>
      </header>

      {/* ── Wide dense mosaic (near full-viewport; only this page) ── */}
      <section aria-label="Symbia product gallery" className="w-full px-2 pb-16 md:px-3">
        <MosaicGallery images={galleryImages} />
      </section>

      {/* Closing panel. What stood here was a heading and a button on a hairline
          rule, which read as the page running out rather than ending. A mosaic is
          all crop and no pause, so it wants to finish on one held frame at rest and
          one block of ground: the same dark panel /impact uses, kept to the mosaic's
          own edges so the page ends on the width it was built at.
          The frame is raw material rather than a product, so it is the one image on
          the page the archive above does not already contain. */}
      <section aria-label="Work with Symbia" className="px-2 pb-16 md:px-3">
        <div className="grid overflow-hidden rounded-2xl lg:grid-cols-2">
          <div className="flex flex-col items-start justify-center gap-6 bg-earth px-8 py-16 md:px-14 md:py-20 lg:px-16">
            <p className="text-[0.875rem] font-medium uppercase tracking-[0.16em] text-soft/60">
              Work with us
            </p>
            <h2 className="max-w-[16ch] font-display text-4xl leading-[1.02] text-soft md:text-5xl lg:text-6xl">
              All of it started as tea.
            </h2>
            <p className="max-w-[46ch] text-lg leading-[1.65] text-soft/60">
              Every piece above was cut from sheets grown out of fermented tea rather
              than tanned from a hide. If one of them is close to what you are trying
              to make, tell us which and what it is for.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-soft transition hover:bg-amber-warm"
              >
                Start a conversation
                <span aria-hidden>↗</span>
              </Link>
              <Link
                href="/about"
                className="text-base text-soft/70 underline decoration-soft/30 underline-offset-4 transition hover:text-soft hover:decoration-soft"
              >
                How the material is made
              </Link>
            </div>
          </div>

          <div className="relative min-h-[24rem] lg:min-h-[34rem]">
            <Image
              src="/material/held.jpg"
              alt="Two hands holding up a full sheet of Kombucha Bioleather against a pale wall"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
