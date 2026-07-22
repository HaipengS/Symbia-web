import Image from "next/image";

export const metadata = {
  title: "About | Symbia",
  description:
    "Symbia is an independent biofabrication research group growing microbial leather from recycled kombucha — and teaching the craft to communities across Indonesia.",
};

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" strokeWidth="1.6">
      <path d="M12 21s-6-5.5-6-10a6 6 0 1 1 12 0c0 4.5-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" strokeWidth="1.6">
      <circle cx="9" cy="8" r="3" />
      <path d="M4 20v-2a4 4 0 0 1 4-4" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M20 20v-2.5a3.5 3.5 0 0 0-3.5-3.5h-2" />
    </svg>
  );
}

function LeafBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" strokeWidth="1.6">
      <path d="M4 12c0 5 4 8 8 8s8-3 8-8" />
      <path d="M12 4c-1.5 2-2.5 4.5-2.5 7.5v2" />
      <path d="M12 4c1.5 2 2.5 4.5 2.5 7.5v2" />
    </svg>
  );
}

const approach = [
  "Research",
  "Collaboration",
  "Product development",
  "Community impact",
];

const values = [
  {
    title: "Waste is a resource",
    body: "Discarded kombucha, tea, and other organic by-products are raw material for something better — not trash.",
  },
  {
    title: "Sustainability should be desirable",
    body: "A greener material only matters if people genuinely want the products made from it, so we design for beauty and durability first.",
  },
  {
    title: "Innovation should include communities",
    body: "We share the method, not just the product — training craftspeople so the value stays local.",
  },
];

const milestones = [
  {
    label: "CO₂ Offset",
    value: "8,000kg+",
    detail:
      "We outsource our calculations and record data of the kilograms of material we produce as well as the emissions that normal leathermaking processes take up. Our fermentation process is practically carbon neutral with the exception of transportation emissions.",
    icon: LeafBadgeIcon,
  },
  {
    label: "Students + Craftspeople Reached",
    value: "16k+",
    detail:
      "Students either attend our events or act as ambassadors for our cause while craftspeople are taught to both grow Kombucha Bioleather themselves and locally advertise products made with our material. Aside from most of these people being from all over Indonesia, we have worked with students in Asia and in the US as well.",
    icon: PeopleIcon,
  },
  {
    label: "Provinces Visited",
    value: "5",
    detail:
      "We have reinvested all profits back into Symbia to fund mission trips to rural Indonesian villages and teach craftspeople in person. Some of our locations include local schools and vocational education centers, where we teach free of charge.",
    icon: MapPinIcon,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Header ── */}
      <header className="relative z-10 mx-auto w-full max-w-[1720px] px-6 md:px-10 lg:px-14 pb-0 pt-16 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-warm/60">About us</p>
            <h1 className="font-display text-5xl font-bold leading-[0.92] tracking-tight text-ink sm:text-6xl md:text-7xl">
              Growing the future of functional sustainability
            </h1>
          </div>
          <p className="text-base leading-relaxed text-ink/55 md:pb-2">
            Symbia is an independent biofabrication research group that grows
            microbial leather out of a Symbiotic culture of bacteria and yeast
            (SCOBY) and recycled Kombucha. Our operations span product
            manufacturing, training programs for Indonesian craftspeople, and
            community awareness.
          </p>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-[1720px] px-6 md:px-10 lg:px-14 pb-28">
        {/* ── Origin story ── */}
        <section className="mt-16 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
          <div className="flex flex-col justify-center gap-5">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">Origin story</p>
              <h2 className="font-display text-3xl font-bold text-ink">Why we exist</h2>
            </div>
            <p className="text-base leading-relaxed text-ink/65">
              Symbia began with a question about materials — whether the artificial
              ones around us could be replaced by something grown rather than
              manufactured.
            </p>
            <blockquote className="border-l-2 border-coral/40 pl-5 text-[0.95rem] italic leading-relaxed text-ink/65">
              &ldquo;My first inception of the idea arrived in September 2023 after
              reminiscing on my summer in New York City: one of my teachers at
              Jakarta Intercultural School had persuaded me to take a summer course
              on nanotechnology at Columbia University, which prompted me to explore
              the potential of natural materials replacing artificial ones.&rdquo;
              <cite className="mt-3 block not-italic text-xs uppercase tracking-[0.1em] text-amber-warm/60">
                — Rayden Yap, Founder &amp; Head Manufacturer
              </cite>
            </blockquote>
            <p className="text-sm leading-relaxed text-ink/60">
              As a social-impact startup, we work with anyone — from seasoned
              artisans to young Gen&nbsp;Z creators — who hopes to develop
              eco-friendly products but lacks the resources or training. Our
              workshops teach the whole process: making the bioleather, and
              navigating social entrepreneurship, just as we did.
            </p>
          </div>

          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl md:aspect-auto">
            <Image
              src="/gallery/galery7.png"
              alt="Rayden showing a bioleather jacket at a Symbia workshop"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 620px, 100vw"
              unoptimized
              priority
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />

        {/* ── What we build ── */}
        <section className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="relative order-last aspect-[4/3] w-full overflow-hidden rounded-2xl md:order-first">
            <Image
              src="/gallery/galery8.png"
              alt="Growing bacterial cellulose from recovered kombucha with students"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 620px, 100vw"
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>

          <div className="space-y-5">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">What we build</p>
              <h2 className="font-display text-3xl font-bold text-ink">
                From recycled kombucha to finished products
              </h2>
            </div>
            <p className="text-base leading-relaxed text-ink/65">
              Symbia runs as three connected efforts: growing and manufacturing
              bioleather products, training Indonesian craftspeople to grow the
              material themselves, and building public awareness of biofabrication.
            </p>
            <p className="text-sm leading-relaxed text-ink/60">
              We&apos;ve made jackets, tote bags, and lamps — some of which were
              gifted to Indonesia&apos;s Ministry of Tourism and Creative Economy —
              and we keep developing new products with the material. The goal is a
              single loop that connects waste recovery, new material development,
              and product creation: from a brewery&apos;s discarded kombucha to a
              finished object in someone&apos;s hands.
            </p>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />

        {/* ── Community & education ── */}
        <section className="space-y-8">
          <div className="max-w-3xl space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">Community &amp; education</p>
            <h2 className="font-display text-3xl font-bold text-ink">
              We teach the craft, not just sell the material
            </h2>
          </div>

          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl md:aspect-[21/8]">
            <Image
              src="/gallery/galery6.png"
              alt="A Symbia kombucha-leather training session in Indonesia"
              fill
              className="object-cover"
              sizes="(min-width: 1720px) 1600px, 92vw"
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <p className="text-base leading-relaxed text-ink/70">
              We visit rural Indonesian provinces to host{" "}
              <span className="text-ink">free training programs</span>, providing
              all the materials and skills for craftspeople to grow their own
              Kombucha Bioleather and sell products made with it locally.
            </p>
            <p className="text-base leading-relaxed text-ink/70">
              Our products also use locally sourced{" "}
              <span className="text-ink">Batik and Tenun fabric</span>, carrying
              intangible cultural heritage onto a global stage rather than replacing
              it.
            </p>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />

        {/* ── Our approach ── */}
        <section className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">How it connects</p>
            <h2 className="font-display text-3xl font-bold text-ink">Our approach</h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            {approach.map((stepLabel, i) => (
              <div key={stepLabel} className="flex items-center gap-3">
                <span className="card-surface inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-ink/80">
                  <span className="font-display text-xs font-bold text-coral">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {stepLabel}
                </span>
                {i < approach.length - 1 && (
                  <span className="text-coral/50" aria-hidden>→</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />

        {/* ── Values ── */}
        <section className="space-y-8">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">What we believe</p>
            <h2 className="font-display text-3xl font-bold text-ink">Our values</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="card-surface rounded-2xl p-6 space-y-3">
                <div className="h-px w-8 bg-coral/60" />
                <p className="font-display text-lg font-bold text-ink">{v.title}</p>
                <p className="text-sm leading-relaxed text-ink/55">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />

        {/* ── Milestones ── */}
        <section className="space-y-8">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">Impact</p>
            <h2 className="font-display text-3xl font-bold text-ink">By the numbers</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {milestones.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="card-surface flex flex-col gap-4 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-coral/15 text-coral">
                      <Icon />
                    </span>
                    <p className="text-xs uppercase tracking-[0.1em] text-amber-warm/55">{item.label}</p>
                  </div>
                  <p className="font-display text-5xl font-bold text-coral">{item.value}</p>
                  <div className="h-px bg-ink/10" />
                  <p className="text-sm leading-relaxed text-ink/55">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Recognition ── */}
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-ink/10 bg-ink/[0.02] px-7 py-5 text-sm text-ink/60">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-warm/70">
            Along the way
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden />
            Showcased at the 10th World Water Forum
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden />
            Products gifted to Indonesia&apos;s Ministry of Tourism &amp; Creative Economy
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden />
            Free training across five Indonesian provinces
          </span>
        </div>
      </main>
    </>
  );
}
