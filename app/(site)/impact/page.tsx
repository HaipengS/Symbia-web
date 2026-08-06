import Image from "next/image";

export const metadata = {
  title: "Impact | Symbia",
  description:
    "Symbia's two programmes alongside manufacturing: free training that leaves craftspeople able to grow the material themselves, and a fermentation process that stays close to carbon neutral.",
};

/**
 * Impact. Written to be read by anyone who lands on it, so the two programmes are
 * set as equal parallel tracks rather than split into sections addressed at
 * separate audiences. Every figure carries the explanation it came with, which is
 * what stops the numbers reading as decoration.
 *
 * This page is the single home for the training and offsetting material. It was
 * previously spread across the About milestones, the About community section and
 * the homepage stats strip, which stated the same five-province fact five times.
 * Not linked from the navbar yet: that waits until the Contact route lands, so the
 * navigation and its mobile menu are built once against the final set of routes.
 */

const arms = [
  {
    label: "Teaching",
    heading: "The method travels with the people who learn it",
    body: [
      "Symbia visits rural Indonesian provinces to run training programmes free of charge, providing every material and skill a craftsperson needs to grow their own Kombucha Bioleather and sell what they make locally.",
      "Sessions run in villages, local schools and vocational education centres. The workshops teach the whole process, both growing the material and navigating social entrepreneurship.",
    ],
  },
  {
    label: "Environmental offsetting",
    heading: "Fermentation instead of tanning",
    body: [
      "The material is grown rather than manufactured. Fermentation replaces the chemistry of conventional leathermaking, and the inputs are organic by-products that would otherwise be discarded.",
      "The process is practically carbon neutral, with the exception of transport emissions.",
    ],
  },
];

// Verbatim from the figures as they were published, so the explanation always
// travels with the number.
const figures = [
  {
    value: "8,000kg+",
    label: "CO₂ offset",
    detail:
      "We outsource our calculations and record data of the kilograms of material we produce as well as the emissions that normal leathermaking processes take up. Our fermentation process is practically carbon neutral with the exception of transportation emissions.",
  },
  {
    value: "16k+",
    label: "Students and craftspeople reached",
    detail:
      "Students either attend our events or act as ambassadors for our cause while craftspeople are taught to both grow Kombucha Bioleather themselves and locally advertise products made with our material. Aside from most of these people being from all over Indonesia, we have worked with students in Asia and in the US as well.",
  },
  {
    value: "5",
    label: "Provinces visited",
    detail:
      "We have reinvested all profits back into Symbia to fund mission trips to rural Indonesian villages and teach craftspeople in person. Some of our locations include local schools and vocational education centers, where we teach free of charge.",
  },
];

const steps = [
  {
    step: "01",
    title: "Funded from the work itself",
    body: "Profits go back into Symbia to pay for the trips, which is why the training can be free.",
  },
  {
    step: "02",
    title: "Taught in person",
    body: "Sessions happen where the craftspeople are: rural villages, local schools, vocational education centres.",
  },
  {
    step: "03",
    title: "Materials provided",
    body: "Everything needed to start growing the material is supplied, so there is nothing to buy before beginning.",
  },
  {
    step: "04",
    title: "The whole process, not a demonstration",
    body: "Growing and finishing the bioleather, and the social entrepreneurship needed to sell it.",
  },
  {
    step: "05",
    title: "The value stays local",
    body: "Craftspeople grow their own sheets afterwards and sell the products they make in their own markets.",
  },
];

const SECTION_LABEL =
  "text-[0.875rem] font-medium uppercase tracking-[0.16em] text-amber-warm/80";

export default function ImpactPage() {
  return (
    <>
      {/* ── Opening statement. No figure here on purpose: the claim comes first. ── */}
      <header className="mx-auto w-full max-w-[1720px] px-6 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24 lg:px-14">
        <p className={SECTION_LABEL}>Impact</p>
        <h1 className="mt-6 max-w-[24ch] font-display text-5xl leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          The method travels further than the material.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-[1.7] text-ink/65">
          Two programmes run alongside manufacturing. One puts the method in other
          people&apos;s hands, free of charge. The other keeps the material itself close
          to carbon neutral.
        </p>
      </header>

      {/* ── The two arms, equal weight, side by side. ── */}
      <section
        aria-label="Symbia's two impact programmes"
        className="mx-auto w-full max-w-[1720px] px-6 md:px-10 lg:px-14"
      >
        <div className="grid border-t border-ink/15 md:grid-cols-2">
          {arms.map((arm, i) => (
            <div
              key={arm.label}
              className={`flex flex-col gap-5 py-10 md:py-14 ${
                i === 0
                  ? "md:border-r md:border-ink/12 md:pr-12 lg:pr-20"
                  : "border-t border-ink/12 md:border-t-0 md:pl-12 lg:pl-20"
              }`}
            >
              <p className={SECTION_LABEL}>{arm.label}</p>
              <h2 className="max-w-[22ch] font-display text-3xl leading-[1.1] text-ink md:text-[2.5rem]">
                {arm.heading}
              </h2>
              <div className="flex flex-col gap-4">
                {arm.body.map((p) => (
                  <p key={p} className="max-w-prose text-base leading-[1.7] text-ink/65">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dark band: the figures, each with the explanation it was published with. ── */}
      <section aria-label="Impact figures" className="mt-8 bg-earth py-20 md:mt-16 md:py-28">
        <div className="mx-auto w-full max-w-[1720px] px-6 md:px-10 lg:px-14">
          <p className="text-[0.875rem] font-medium uppercase tracking-[0.16em] text-soft/60">
            By the numbers
          </p>
          <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-10 lg:gap-16">
            {figures.map((f) => (
              <div key={f.label} className="flex flex-col gap-4 border-t border-soft/20 pt-6">
                <p className="font-display text-6xl leading-none text-soft md:text-7xl">
                  {f.value}
                </p>
                <p className="text-sm uppercase tracking-[0.12em] text-soft/60">{f.label}</p>
                <p className="text-sm leading-[1.75] text-soft/55">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How a session runs. Numbered because it genuinely is a sequence. ── */}
      <section
        aria-label="How a training programme runs"
        className="mx-auto w-full max-w-[1720px] px-6 py-20 md:px-10 md:py-28 lg:px-14"
      >
        {/* The heading column was sticky and short, which parked a tall empty block
            beside the list. It scrolls with the page now, and the list carries larger
            copy so the rows are filled by their own text rather than by padding. */}
        <div className="grid gap-12 lg:grid-cols-[24rem_minmax(0,1fr)] lg:gap-20">
          <div className="flex flex-col gap-5">
            <p className={SECTION_LABEL}>How a programme runs</p>
            <h2 className="font-display text-4xl leading-[1.05] text-ink md:text-5xl">
              Free to attend, and it does not end when we leave.
            </h2>
            <p className="text-lg leading-[1.65] text-ink/65">
              The point of a session is that the craftspeople who attend can grow the
              material without us afterwards.
            </p>

            {/* Fills the column the heading alone left half empty, and answers the
                question the list does not: where these actually happen. */}
            <dl className="mt-2 flex flex-col border-t border-ink/12">
              {[
                ["Runs in", "Villages, local schools, vocational education centres"],
                ["Cost to attend", "None, in every session so far"],
                ["Provinces so far", "Five"],
              ].map(([term, value]) => (
                <div key={term} className="flex flex-col gap-1 border-b border-ink/12 py-4">
                  <dt className="text-[0.75rem] uppercase tracking-[0.13em] text-amber-warm/80">
                    {term}
                  </dt>
                  <dd className="text-base leading-[1.6] text-ink/70">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ol className="flex flex-col">
            {steps.map((s) => (
              <li
                key={s.step}
                className="grid grid-cols-[3rem_minmax(0,1fr)] gap-5 border-t border-ink/12 py-7 last:border-b md:gap-8"
              >
                <span className="font-display text-xl text-coral md:text-2xl" aria-hidden>
                  {s.step}
                </span>
                <div className="flex flex-col gap-2.5">
                  <h3 className="font-display text-2xl text-ink md:text-[1.75rem]">
                    {s.title}
                  </h3>
                  <p className="max-w-prose text-lg leading-[1.65] text-ink/65">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Awareness: the events that sit alongside the workshops. ── */}
      <section aria-label="Events and awareness" className="w-full">
        <div className="relative aspect-[3/2] w-full md:aspect-[21/9]">
          <Image
            src="/impact/seminar-audience.jpg"
            alt="Students filling the hall at a Symbia seminar in Indonesia"
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
        </div>

        <div className="mx-auto w-full max-w-[1720px] px-6 py-16 md:px-10 md:py-20 lg:px-14">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 lg:gap-24">
            <div className="flex flex-col gap-5">
              <p className={SECTION_LABEL}>Awareness</p>
              <h2 className="max-w-[24ch] font-display text-3xl leading-[1.1] text-ink md:text-4xl">
                Reaching the people who will make the next material
              </h2>
              <p className="text-base leading-[1.7] text-ink/65">
                Alongside the workshops, Symbia speaks at schools and public events.
                In August 2025 it ran a seminar with Indonesia&apos;s Ministry of
                Creative Economy and KOMIB, titled The Need for Creativity in
                Sustainability Efforts.
              </p>
              <p className="text-base leading-[1.7] text-ink/65">
                Students either attend these events or go on to act as ambassadors.
                Most are across Indonesia, and there has been work with students
                elsewhere in Asia and in the United States.
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/impact/seminar-students.jpg"
                alt="Students taking the microphone during a Symbia seminar"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Where, and what the products carry. ── */}
      <section
        aria-label="Where Symbia works"
        className="mx-auto w-full max-w-[1720px] px-6 pb-24 md:px-10 md:pb-32 lg:px-14"
      >
        <div className="grid gap-12 border-t border-ink/15 pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 lg:gap-24">
          <div className="flex flex-col gap-5">
            <p className={SECTION_LABEL}>Where</p>
            <h2 className="max-w-[20ch] font-display text-3xl leading-[1.1] text-ink md:text-4xl">
              Five Indonesian provinces so far
            </h2>
            <p className="text-base leading-[1.7] text-ink/65">
              Every trip is funded by the work itself, and every session so far has
              been taught free of charge.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className={SECTION_LABEL}>Cultural heritage</p>
            <h2 className="max-w-[22ch] font-display text-3xl leading-[1.1] text-ink md:text-4xl">
              Batik and Tenun, carried rather than replaced
            </h2>
            <p className="text-base leading-[1.7] text-ink/65">
              Symbia products use locally sourced Batik and Tenun fabric, so the
              craft already present in these regions travels onto a global stage
              instead of being displaced by the new material.
            </p>
          </div>
        </div>

        <div className="relative mt-12 aspect-[2/1] w-full overflow-hidden md:mt-16 md:aspect-[21/8]">
          <Image
            src="/gallery/galery6.png"
            alt="A Symbia Kombucha Bioleather training session in Indonesia"
            fill
            className="object-cover"
            sizes="(min-width: 1720px) 1600px, 92vw"
            unoptimized
          />
        </div>
      </section>
    </>
  );
}
