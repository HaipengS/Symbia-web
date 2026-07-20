import Link from "next/link";

type Audience = {
  title: string;
  paragraphs: string[];
  cta: string;
  href: string;
};

const audiences: Audience[] = [
  {
    title: "If you’re a brand…",
    paragraphs: [
      "We are seeking independent designers and brands across the United States to incorporate our bioleather into their products.",
      "Whether that means replacing leather components in your existing products or collaborating on entirely new designs, we’d love to work together.",
    ],
    cta: "View Product Gallery",
    href: "/gallery",
  },
  {
    title: "If you’re a supplier…",
    paragraphs: [
      "We partner with kombucha breweries, coffee roasters, tea companies, and other local beverage producers throughout the Chicagoland area.",
      "Symbia handles collection completely free of charge and helps transform organic waste into bacterial cellulose for sustainable material production.",
    ],
    cta: "Explore Our Research",
    href: "/research",
  },
];

export default function MissionExpandable() {
  return (
    <section
      className="mx-auto max-w-[1400px] px-6 pb-24 pt-24 text-center md:pt-28"
      aria-label="What Symbia does"
    >
      {/* Title — fills the section width; text-balance evens the two lines */}
      <h2 className="mx-auto max-w-none text-balance font-display text-4xl leading-[1.12] tracking-tight text-ink md:text-5xl">
        Leather Made from Recycled Kombucha &amp; Bacterial Culture
      </h2>

      {/* Body — Inter, comfortable reading size, centered, wide */}
      <p className="mx-auto mt-6 max-w-5xl text-lg leading-[1.7] text-ink/70 md:text-[1.2rem]">
        Symbia grows sustainable leather out of recycled kombucha and bacterial
        culture. We offer our sheets to brands who want to attract customers
        looking for distinct, avant-garde products and are interested in
        sustainability.
      </p>

      {/* Expand / collapse removed for now — audience section is always shown. */}

      {/* Audience selection — two centered, symmetric columns */}
      <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-0">
        {audiences.map((a, i) => (
          <div
            key={a.href}
            className={`flex h-full flex-col items-center px-4 text-center md:px-12 ${
              i === 0 ? "md:border-r md:border-ink/12" : ""
            }`}
          >
            <h3 className="font-display text-2xl text-ink md:text-[1.75rem]">
              {a.title}
            </h3>

            <div className="mt-5 flex flex-1 max-w-sm flex-col gap-4">
              {a.paragraphs.map((p, j) => (
                <p key={j} className="text-[0.95rem] leading-[1.65] text-ink/65">
                  {p}
                </p>
              ))}
            </div>

            <Link
              href={a.href}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-soft transition hover:bg-amber-warm"
            >
              {a.cta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
