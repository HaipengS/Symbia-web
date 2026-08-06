import Image from "next/image";
import Link from "next/link";
import WorkflowStepper, { type WorkflowStep } from "@/components/WorkflowStepper";

export const metadata = {
  title: "Research | Symbia",
  description:
    "How Symbia turns organic by-products from local beverage makers into bacterial cellulose and bioleather, and why it's worth partnering with us.",
};

const problems = [
  {
    title: "Discarded value",
    body: "SCOBY, spent grounds, and tea residue are treated as trash the day they're produced, even though they're clean, consistent organic material.",
  },
  {
    title: "An operational burden",
    body: "Storing, hauling, and disposing of wet organic by-products takes time, space, and money every single week.",
  },
  {
    title: "Hard-to-prove sustainability",
    body: "“We reuse our waste” is difficult to make concrete for customers without a real downstream story to point to.",
  },
  {
    title: "No reuse pathway",
    body: "Most small producers simply have no partner set up to take an organic stream and turn it into something visible and valuable.",
  },
];

const feedstocks = [
  "Kombucha SCOBY & fermentation liquid",
  "Spent tea leaves & tea residue",
  "Coffee grounds & related organic inputs",
  "Other clean fermentation by-products",
];

/**
 * Each step carries its own frame, and the panel beside the list follows whichever
 * step is being read. Steps three to six show the thing they describe. One and two
 * do not: there is no photograph of a by-product at a supplier or of a collection,
 * so they show what a stream turns into and the caption says exactly that rather
 * than implying a picture of the pickup.
 */
const workflow: WorkflowStep[] = [
  {
    step: "01",
    title: "Supplier assessment",
    body: "We review your by-product together: what it is, how much you produce, how often, and whether it's a good candidate for testing.",
    you: "Tell us what you make.",
    us: "Assess fit and next steps.",
    image: {
      src: "/process/sheet-grown.jpg",
      alt: "A single sheet of Kombucha Bioleather on a pale surface, its edges left as they grew",
      caption: "What a clean stream turns into",
    },
  },
  {
    step: "02",
    title: "Collection & handling",
    body: "We agree a pickup rhythm that fits your operation and simple storage guidance so the material stays usable between collections.",
    you: "Set the agreed stream aside.",
    us: "Handle collection, free of charge.",
    image: {
      src: "/process/sheets-folded.jpg",
      alt: "Several finished sheets of Kombucha Bioleather folded and stacked",
      caption: "Finished sheets, folded and stacked",
    },
  },
  {
    step: "03",
    title: "Feedstock preparation",
    body: "Back at the studio, the recovered material is cleaned, filtered, and prepared to feed our cultivation system.",
    you: null,
    us: "Handle all processing.",
    image: {
      src: "/material/scale.jpg",
      alt: "Kombucha Bioleather at full sheet size, showing the scale a single growth reaches",
      caption: "One growth, at full size",
    },
  },
  {
    step: "04",
    title: "Bacterial-cellulose cultivation",
    body: "Under controlled conditions, microorganisms ferment the prepared feedstock and grow cellulose into sheets over time.",
    you: null,
    us: "Run the cultivation.",
    image: {
      src: "/process/step1.png",
      alt: "Gloved hands lifting a grown cellulose pellicle out of a vat of fermented tea",
      caption: "Lifting a pellicle from the vat",
    },
  },
  {
    step: "05",
    title: "Drying, treatment & finishing",
    body: "The grown cellulose is pressed, dried, and finished into a workable material with the feel and durability of leather.",
    you: null,
    us: "Finish the material.",
    image: {
      src: "/process/step2.png",
      alt: "A wet harvested sheet laid flat on a green drying rack",
      caption: "Laid out on the drying rack",
    },
  },
  {
    step: "06",
    title: "Prototype & product development",
    body: "The finished bioleather is tested and developed into products: accessories, bags, apparel components, and prototypes.",
    you: null,
    us: "Build & showcase with partners.",
    image: {
      src: "/products/symbia-bag-10.jpg",
      alt: "A finished bag in Kombucha Bioleather, held open to show its woven Tenun lining",
      caption: "A finished bag, lined in Tenun",
    },
  },
];

const environmental = [
  "Keeps reusable organic material out of the disposal stream.",
  "Supports circular material development in the local area.",
  "Extends the life and value of by-products you already produce.",
  "Reduces reliance on conventional, higher-impact material inputs.",
];

const winWin = {
  suppliers: [
    "A concrete circular-economy story",
    "Less organic waste to manage",
    "A role in local material innovation",
    "Visibility through collaborations & events",
  ],
  symbia: [
    "Reliable local feedstocks",
    "Continued material research",
    "New product possibilities",
    "Lasting local partnerships",
  ],
};

export default function ResearchPage() {
  return (
    <>
      {/* ── Header: supplier value proposition + a real cultivation image ── */}
      <header className="relative z-10 mx-auto w-full max-w-[1720px] px-6 md:px-10 lg:px-14 pb-12 pt-16 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
              For suppliers
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Turn your organic by-products into something valuable.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink/65 md:text-lg">
              Symbia partners with kombucha breweries, coffee roasters, tea
              companies, and cafés across the Chicagoland area to redirect organic
              by-products into biofabrication research, growing them into
              bacterial cellulose and, ultimately, bioleather. We handle
              collection; you gain a concrete circular-economy story.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 pt-1 text-sm text-ink/55">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden />
                Free collection
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden />
                Local partnerships
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden />
                A real second life for your waste
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src="/gallery/galery8.png"
              alt="Growing bacterial cellulose from recovered kombucha"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 640px, 100vw"
              unoptimized
              priority
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-[1720px] px-6 md:px-10 lg:px-14 pb-24">
        {/* ── The problem ── */}
        <section aria-label="Why your by-products matter" className="pt-4">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
              The problem
            </p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
              Right now, your by-products are just waste.
            </h2>
            <p className="text-base leading-relaxed text-ink/60">
              For most beverage businesses, organic by-products are hauled away at
              a cost, with nothing to show for it.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p) => (
              <div key={p.title} className="card-surface rounded-2xl p-6">
                <div className="h-px w-8 bg-coral/60" />
                <h3 className="font-display mt-4 text-lg font-bold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What we can use ── */}
        <section aria-label="What Symbia can use" className="mt-20">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
                What we can use
              </p>
              <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                We&apos;re always evaluating new feedstocks.
              </h2>
              <p className="text-base leading-relaxed text-ink/60">
                We evaluate each potential feedstock on consistency, cleanliness,
                composition, and suitability for bacterial-cellulose growth. Not
                every stream is a fit, and that&apos;s something we&apos;ll assess
                together.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {feedstocks.map((f) => (
                <li
                  key={f}
                  className="card-surface flex items-start gap-3 rounded-2xl p-5 text-sm font-medium text-ink/80"
                >
                  <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full bg-coral"
                    aria-hidden
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── The workflow: timeline + sticky aside ── */}
        <section aria-label="How it works" className="mt-20">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
              How it works
            </p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
              From by-product to bioleather
            </h2>
            <p className="text-base leading-relaxed text-ink/60">
              A clear, six-step workflow. You provide the by-product; we handle
              everything after that.
            </p>
          </div>

          <WorkflowStepper steps={workflow} />
        </section>

        {/* ── Environmental value ── */}
        <section aria-label="Environmental value" className="mt-20">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
              Environmental value
            </p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
              Every stream we redirect is one that doesn&apos;t go to waste.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {environmental.map((e) => (
              <div
                key={e}
                className="flex items-start gap-3 rounded-2xl bg-ink/[0.03] p-5 text-sm leading-relaxed text-ink/70"
              >
                <span
                  className="mt-0.5 font-display text-lg leading-none text-coral"
                  aria-hidden
                >
                  ✓
                </span>
                {e}
              </div>
            ))}
          </div>
        </section>

        {/* ── Win-win ── */}
        <section aria-label="A two-way partnership" className="mt-20">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
              Why it works
            </p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
              A partnership, not a favor.
            </h2>
            <p className="text-base leading-relaxed text-ink/60">
              Your by-product supports our material development, and our work gives
              your waste stream a new story and real potential value.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="card-surface rounded-2xl p-7">
              <p className="text-xs uppercase tracking-[0.14em] text-amber-warm/70">
                For suppliers
              </p>
              <ul className="mt-5 space-y-3">
                {winWin.suppliers.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink/75">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface rounded-2xl p-7">
              <p className="text-xs uppercase tracking-[0.14em] text-amber-warm/70">
                For Symbia
              </p>
              <ul className="mt-5 space-y-3">
                {winWin.symbia.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink/75">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* The supplier form that closed this page now lives on /contact, where it
            is one of four options. The wording that was in it survives as the
            instruction here, so nothing a supplier needed to be told is lost. */}
        <section aria-label="Become a supplier" className="mt-24">
          {/* Copy left, frame right. The copy alone stopped 780px short of the
              container, and this is the page's conversion point, so it is the last
              place that should look unfinished. The two facts are lifted out of the
              workflow above on purpose: cost and effort are the two things a
              supplier weighs, and they belong next to the button as well as inside
              step two. */}
          <div className="grid gap-10 border-t border-ink/12 pt-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="flex flex-col items-start gap-5">
              <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
                Become a supplier
              </p>
              <h2 className="max-w-[22ch] font-display text-3xl font-bold text-ink md:text-4xl">
                Tell us what your business produces
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-ink/60">
                Say what you make, the organic by-product it generates, the rough
                quantity, and how often it is available. On the contact page, choose
                &ldquo;An organic by-product to supply&rdquo; and the form will ask
                for exactly that.
              </p>

              <dl className="grid w-full gap-x-8 gap-y-4 border-t border-ink/12 pt-5 sm:grid-cols-2">
                {[
                  ["What it costs you", "Nothing. We handle collection."],
                  ["What we need from you", "The agreed stream, set aside."],
                ].map(([term, value]) => (
                  <div key={term} className="flex flex-col gap-1">
                    <dt className="text-[0.75rem] uppercase tracking-[0.13em] text-amber-warm/80">
                      {term}
                    </dt>
                    <dd className="text-base leading-[1.5] text-ink/70">{value}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-soft transition hover:bg-amber-warm"
              >
                Get in touch
                <span aria-hidden>↗</span>
              </Link>
            </div>

            {/* Landscape crop of a portrait frame, sized to finish level with the
                copy beside it. Distinct from the two sheets used in the workflow
                above: this one is the material being handled, not sitting still. */}
            <figure className="flex flex-col gap-3">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-cream">
                <Image
                  src="/material/in-hand.jpg"
                  alt="Two hands smoothing a large amber sheet of Kombucha Bioleather"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Describes the photograph, not the supply chain: which stream this
                  particular sheet came from is not something we can state. */}
              <figcaption className="text-[0.6875rem] uppercase tracking-[0.16em] text-ink/50">
                A finished sheet, worked by hand
              </figcaption>
            </figure>
          </div>
        </section>
      </main>
    </>
  );
}
