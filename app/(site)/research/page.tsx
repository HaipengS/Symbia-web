import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Research | Symbia",
  description:
    "How Symbia turns organic by-products from local beverage makers into bacterial cellulose and bioleather — and why it's worth partnering with us.",
};

const problems = [
  {
    title: "Discarded value",
    body: "SCOBY, spent grounds, and tea residue are treated as trash the day they're produced — even though they're clean, consistent organic material.",
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

const workflow = [
  {
    step: "01",
    title: "Supplier assessment",
    body: "We review your by-product together — what it is, how much you produce, how often, and whether it's a good candidate for testing.",
    you: "Tell us what you make.",
    us: "Assess fit and next steps.",
  },
  {
    step: "02",
    title: "Collection & handling",
    body: "We agree a pickup rhythm that fits your operation and simple storage guidance so the material stays usable between collections.",
    you: "Set the agreed stream aside.",
    us: "Handle collection, free of charge.",
  },
  {
    step: "03",
    title: "Feedstock preparation",
    body: "Back at the studio, the recovered material is cleaned, filtered, and prepared to feed our cultivation system.",
    you: null,
    us: "Handle all processing.",
  },
  {
    step: "04",
    title: "Bacterial-cellulose cultivation",
    body: "Under controlled conditions, microorganisms ferment the prepared feedstock and grow cellulose into sheets over time.",
    you: null,
    us: "Run the cultivation.",
  },
  {
    step: "05",
    title: "Drying, treatment & finishing",
    body: "The grown cellulose is pressed, dried, and finished into a workable material with the feel and durability of leather.",
    you: null,
    us: "Finish the material.",
  },
  {
    step: "06",
    title: "Prototype & product development",
    body: "The finished bioleather is tested and developed into products — accessories, bags, apparel components, and prototypes.",
    you: null,
    us: "Build & showcase with partners.",
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
              by-products into biofabrication research — growing them into
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
              a cost — with nothing to show for it.
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
                composition, and suitability for bacterial-cellulose growth — so
                not every stream is a fit, and that&apos;s something we&apos;ll
                assess together.
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
              A clear, six-step workflow. You provide the by-product — we handle
              everything after that.
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <ol className="relative space-y-8 border-l border-ink/12 pl-8">
              {workflow.map((s) => (
                <li key={s.step} className="relative">
                  <span
                    className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-coral font-display text-xs font-bold text-soft ring-4 ring-[#ffffff]"
                    aria-hidden
                  >
                    {s.step}
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/65">
                    {s.body}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs">
                    {s.you && (
                      <span className="text-ink/55">
                        <span className="font-semibold uppercase tracking-[0.1em] text-amber-warm/70">
                          You
                        </span>{" "}
                        · {s.you}
                      </span>
                    )}
                    <span className="text-ink/55">
                      <span className="font-semibold uppercase tracking-[0.1em] text-coral/80">
                        Symbia
                      </span>{" "}
                      · {s.us}
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            <aside className="card-surface overflow-hidden rounded-2xl lg:sticky lg:top-24">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/process/step1.png"
                  alt="Fermenting bioleather sheets"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 340px, 100vw"
                  unoptimized
                />
              </div>
              <div className="space-y-3 p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-amber-warm/70">
                  At a glance
                </p>
                <p className="text-sm leading-relaxed text-ink/70">
                  You set aside a clean organic stream. We collect it, grow it into
                  bacterial cellulose, and develop it into finished bioleather —
                  the whole process, handled.
                </p>
              </div>
            </aside>
          </div>
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

        {/* ── Contact: centered, supplier-focused ── */}
        <div className="mx-auto mt-24 w-full max-w-3xl">
          <ContactSection
            email={CONTACT_EMAIL}
            centered
            eyebrow="Become a supplier"
            heading="Tell us what your business produces"
            description="Share what you make, the organic by-product you have, and how often it's generated. We'll review whether it may be a fit for our research and collection workflow."
            messageLabel="Your business & by-product"
            messagePlaceholder="Your business, the by-product you produce (e.g. kombucha SCOBY, spent tea, coffee grounds), rough quantity, and how often it's available."
          />
        </div>
      </main>
    </>
  );
}
