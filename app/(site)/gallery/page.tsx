import ContactSection from "@/components/ContactSection";
import MosaicGallery from "@/components/MosaicGallery";
import { galleryImages } from "@/data/galleryImages";
import { CONTACT_EMAIL } from "@/lib/constants";

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
          and events — from our studio and our work in the field.
        </p>
      </header>

      {/* ── Wide dense mosaic (near full-viewport; only this page) ── */}
      <section aria-label="Symbia product gallery" className="w-full px-2 pb-16 md:px-3">
        <MosaicGallery images={galleryImages} />
      </section>

      {/* ── Contact (standard readable width) ── */}
      <div className="mx-auto w-full max-w-5xl px-6 pb-24">
        <ContactSection email={CONTACT_EMAIL} />
      </div>
    </>
  );
}
