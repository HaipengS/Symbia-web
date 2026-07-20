import Navbar from "@/components/Navbar";
import Image from "next/image";

export const metadata = {
  title: "About | Symbia",
  description: "Learn more about Symbia's mission and team.",
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

const milestones = [
  {
    label: "CO₂ Offset",
    value: "8,000kg+",
    detail: "We outsource our calculations and record data of the kilograms of material we produce as well as the emissions that normal leathermaking processes take up. Our fermentation process is practically carbon neutral with the exception of transportation emissions.",
    icon: LeafBadgeIcon,
  },
  {
    label: "Students + Craftspeople Reached",
    value: "16k+",
    detail: "Students either attend our events or act as ambassadors for our cause while craftspeople are taught to both grow Kombucha Bioleather themselves and locally advertise products made with our material. Aside from most of these people being from all over Indonesia, we have worked with students in Asia and in the US as well.",
    icon: PeopleIcon,
  },
  {
    label: "Provinces Visited",
    value: "5",
    detail: "We have reinvested all profits back into Symbia to fund mission trips to rural Indonesian villages and teach craftspeople in person. Some of our locations include local schools and vocational education centers, where we teach free of charge.",
    icon: MapPinIcon,
  },
];

const values = [
  {
    title: "Circular design",
    body: "We transform kombucha cellulose into durable biomaterials that can be regenerated and reused.",
  },
  {
    title: "Community first",
    body: "Our programs are built with rural craftspeople to unlock new revenue streams close to home.",
  },
  {
    title: "Radical transparency",
    body: "From sourcing to finishing, we document every step so partners can see exactly how their leather is made.",
  },
];

export default function AboutPage() {
  return (
    <div className="warm-bg relative min-h-screen overflow-hidden text-ink">
      <div className="absolute inset-0" />

      <Navbar />

      {/* ── Header ── */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pb-0 pt-20 md:pt-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-warm/60">About us</p>
            <h1 className="font-display text-5xl font-bold leading-[0.92] tracking-tight text-ink sm:text-6xl md:text-7xl">
              Growing the future of functional sustainability
            </h1>
          </div>
          <p className="text-base leading-relaxed text-ink/55 md:pb-2">
            Symbia is an independent biofabrication research group that grows microbial leather out of a Symbiotic culture of bacteria and yeast (SCOBY) and recycled Kombucha. Our operations span product manufacturing, training programs for Indonesian craftspeople, and community awareness.
          </p>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-28">

        {/* ── Why we exist ── */}
        <section className="mt-16 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="space-y-5">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">Origin story</p>
              <h2 className="font-display text-3xl font-bold text-ink">Why we exist</h2>
            </div>
            <blockquote className="border-l-2 border-coral/40 pl-5 text-sm italic leading-relaxed text-ink/65">
              &ldquo;My first inception of the idea arrived in September 2023 after reminiscing on my summer in New York City: one of my teachers at Jakarta Intercultural School had persuaded me to take a summer course on nanotechnology at Columbia University, which prompted me to explore the potential of natural materials replacing artificial ones.&rdquo;
            </blockquote>
            <p className="text-xs uppercase tracking-[0.1em] text-amber-warm/50">
              — Rayden Yap, Founder &amp; Head Manufacturer
            </p>
            <p className="text-sm leading-relaxed text-ink/60">
              As a social impact startup, we&apos;ll work with anyone — from seasoned artisans to young Gen Z influencers — who hopes to develop eco-friendly products but lacks resources or training. Our workshops teach participants the process of making our bioleather and navigating social entrepreneurship just as we have.
            </p>
          </div>

          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
            <Image
              src="/gallery/galery7.png"
              alt="Symbia workshop"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 420px, 100vw"
              unoptimized
              priority
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />

        {/* ── Values ── */}
        <section className="space-y-8">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/60">What drives us</p>
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

      </main>
    </div>
  );
}
