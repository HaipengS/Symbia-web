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

      {/* The generic contact form that stood here is now one page at /contact. It
          asked nothing this page's visitors would answer differently, unlike the
          supplier form on Research, which stays where it is. */}
      <section aria-label="Contact Symbia" className="px-2 pb-24 md:px-3">
        <div className="flex flex-col items-start gap-5 border-t border-ink/12 pt-10">
          <h2 className="max-w-[20ch] font-display text-3xl leading-[1.1] text-ink md:text-4xl">
            Something here you want made in Kombucha Bioleather?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-soft transition hover:bg-amber-warm"
          >
            Get in touch
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
