import ContactSection from "@/components/ContactSection";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Gallery | Symbia",
  description:
    "Browse Symbia's bioleather materials, previous work, and collaborations — for brands and designers.",
};

export default function GalleryPage() {
  return (
    <>
      <header className="relative z-10 mx-auto flex max-w-5xl flex-col gap-5 px-6 pb-8 pt-16 md:pt-20 text-left">
        <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
          For brands
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
          Our materials &amp; work
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-ink/65">
          A look at our bioleather sheets, finishes, and the products we&apos;ve
          made with independent designers and brands. Placeholder intro — swap in
          the final gallery copy and imagery.
        </p>
      </header>

      <main className="relative z-10 mx-auto flex max-w-5xl flex-col gap-14 px-6 pb-20">
        {/* ── Gallery grid placeholder ── */}
        <section aria-label="Material and product gallery">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="card-surface flex aspect-[4/5] items-center justify-center rounded-2xl text-xs uppercase tracking-[0.14em] text-ink/25"
              >
                Image {i + 1}
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <ContactSection email={CONTACT_EMAIL} />
      </main>
    </>
  );
}
