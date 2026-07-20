import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Research | Symbia",
  description:
    "How Symbia turns organic waste into bacterial cellulose — our process, research, and supplier partnerships.",
};

const stages = [
  {
    step: "01",
    title: "Waste collection",
    detail:
      "Placeholder — describe how organic waste is sourced from kombucha breweries, coffee roasters, and tea companies, collected free of charge.",
  },
  {
    step: "02",
    title: "Bacterial cellulose",
    detail:
      "Placeholder — outline the fermentation process that repurposes that waste into bacterial cellulose sheets.",
  },
  {
    step: "03",
    title: "Finished bioleather",
    detail:
      "Placeholder — cover drying, forming, and finishing into the material brands build with.",
  },
];

export default function ResearchPage() {
  return (
    <div className="warm-bg relative min-h-screen overflow-hidden text-ink">
      <div className="absolute inset-0" />

      <Navbar />

      <header className="relative z-10 mx-auto flex max-w-5xl flex-col gap-5 px-6 py-16 text-left">
        <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
          For suppliers
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
          Our research &amp; process
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-ink/65">
          How we turn organic waste into bacterial cellulose, and how supplier
          partnerships power a circular economy across the Chicagoland area.
          Placeholder intro — swap in the final research copy.
        </p>
      </header>

      <main className="relative z-10 mx-auto flex max-w-5xl flex-col gap-14 px-6 pb-20">
        {/* ── Process stages placeholder ── */}
        <section aria-label="Research process" className="grid gap-5 sm:grid-cols-3">
          {stages.map((s) => (
            <div key={s.step} className="card-surface rounded-2xl p-6">
              <span className="font-display text-4xl font-bold leading-none text-coral/30">
                {s.step}
              </span>
              <h2 className="font-display mt-4 text-lg font-bold text-ink">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {s.detail}
              </p>
            </div>
          ))}
        </section>

        {/* ── Contact ── */}
        <ContactSection email={CONTACT_EMAIL} />
      </main>
    </div>
  );
}
