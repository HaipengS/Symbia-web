import Image from "next/image";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { CONTACT_EMAIL } from "@/lib/constants";

const processSteps = [
  {
    step: "01",
    label: "Fermenting sheets",
    caption: "",
    src: "/process/step1.png",
  },
  {
    step: "02",
    label: "Drying and forming",
    caption: "",
    src: "/process/step2.png",
  },
  {
    step: "03",
    label: "Finishing and finish",
    caption: "",
    src: "/process/step3.png",
  },
];

const galleryImages = Array.from({ length: 12 }).map((_, index) => {
  const num = index + 1;
  return { src: `/gallery/galery${num}.png`, alt: `Gallery image ${num}` };
});

const stats = [
  { value: "8,000kg+", label: "CO₂ offset" },
  { value: "16k+", label: "People reached" },
  { value: "5", label: "Provinces visited" },
];

const stories = [
  {
    name: "",
    quote:
      "Symbia's programs are very suitable for the people in our village because the materials needed are easily sourced, cheap, and environmentally friendly.",
  },
  {
    name: "",
    quote: "This leather is the first of its kind.",
  },
  {
    name: "",
    quote:
      "I was struck by how Rayden encouraged the workers by working alongside them.",
  },
];

/**
 * Everything below the hero, shared by the leather-backed home page and the
 * white logo hero so the two never drift apart.
 */
export default function HomeSections() {
  return (
    <>
      {/* ── Process ── */}
      <section
        className="mx-auto max-w-[1720px] space-y-10 px-6 md:px-10 lg:px-14 py-20"
        id="process"
        aria-label="Symbia leather creation process"
      >
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">
              How it&apos;s made
            </p>
            <h2 className="font-display text-4xl font-bold text-ink">
              The process
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-ink/45 md:block">
            From SCOBY culture to finished bioleather — entirely fermentation-based.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {processSteps.map((step, index) => (
            <div
              key={step.label}
              className="group relative overflow-hidden card-surface rounded-2xl transition-transform duration-500 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={step.src}
                  alt={step.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 320px, 90vw"
                  unoptimized
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 font-display text-5xl font-bold leading-none text-white/10">
                  {step.step}
                </span>
              </div>
              <div className="p-5">
                <p className="font-display text-base font-bold text-ink">
                  {step.label}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-amber-warm/50">
                  {step.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-14">
        <div className="h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />
      </div>

      {/* ── Impact: community story that gives the numbers below their meaning ── */}
      <section className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-14 pt-16" id="impact" aria-label="Our impact">
        <p className="mb-8 text-xs uppercase tracking-[0.16em] text-amber-warm/60">
          In the community
        </p>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <p className="text-base leading-relaxed text-ink/70">
            We visit rural Indonesian provinces to host{" "}
            <span className="text-ink">free training programs</span>, providing
            all materials and skills for craftspeople to grow their own Kombucha
            Bioleather.
          </p>
          <p className="text-base leading-relaxed text-ink/70">
            Our products also use locally sourced{" "}
            <span className="text-ink">Batik and Tenun fabric</span> to promote
            our intangible cultural heritage on a global scale.
          </p>
        </div>
      </section>

      {/* ── Stats strip: the numbers behind that work, leading into the gallery ── */}
      <section className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-14 pb-14 pt-8" aria-label="Impact metrics">
        <div className="grid grid-cols-3 divide-x divide-ink/10 card-surface rounded-2xl">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 px-6 py-7">
              <span className="font-display text-3xl font-bold text-coral md:text-4xl">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.12em] text-ink/45">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-14">
        <div className="h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />
      </div>

      {/* ── Gallery ── */}
      <section className="py-20" id="gallery" aria-label="Symbia gallery">
        <div className="mx-auto mb-8 max-w-[1720px] px-6 md:px-10 lg:px-14">
          <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">
            In the field
          </p>
          <h2 className="font-display mt-1 text-4xl font-bold text-ink">
            Our work
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#ffffff] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#ffffff] to-transparent" />

          <div className="space-y-3">
            <div className="marquee-row animate-marquee-left">
              {[...galleryImages, ...galleryImages].map((item, i) => (
                <div key={`top-${i}-${item.src}`} className="marquee-item">
                  <div className="relative h-44 w-64 overflow-hidden rounded-xl">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="256px"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="marquee-row animate-marquee-right">
              {[...galleryImages, ...galleryImages].map((item, i) => (
                <div key={`bottom-${i}-${item.src}`} className="marquee-item">
                  <div className="relative h-44 w-64 overflow-hidden rounded-xl">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="256px"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-14">
        <div className="h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />
      </div>

      {/* ── Stories ── */}
      <section
        className="mx-auto max-w-[1720px] space-y-10 px-6 md:px-10 lg:px-14 py-20"
        id="stories"
        aria-label="Real stories"
      >
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">
            Community voices
          </p>
          <h2 className="font-display text-4xl font-bold text-ink">
            Real stories
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {stories.map((story) => (
            <div
              key={story.quote}
              className="card-surface flex flex-col gap-5 rounded-2xl p-6"
            >
              <span className="font-display text-5xl leading-none text-coral/25" aria-hidden>
                &ldquo;
              </span>
              <p className="flex-1 text-sm leading-relaxed text-ink/75">
                {story.quote}
              </p>
              <div className="h-px bg-ink/10" />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-warm/60">
                {story.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Get in touch ── */}
      <div className="mx-auto max-w-4xl px-6 pb-24 md:px-10 lg:px-14">
        <ContactSection email={CONTACT_EMAIL} />
      </div>

      {/* ── Social footer ── */}
      <Footer />
    </>
  );
}
