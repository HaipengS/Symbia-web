import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Products | Symbia",
  description:
    "Template for Symbia product listings with pricing placeholders and ordering details.",
};

const productLines = [
  {
    name: "Everyday Tote",
    price: "$220",
    description:
      "Placeholder copy for our hero carryall. Swap in final leather finish, dimensions, and hardware notes.",
    status: "Pre-order",
    leadTime: "Estimate lead time here (e.g., 4-6 weeks).",
  },
  {
    name: "Slim Folio",
    price: "$160",
    description:
      "Use this slot for laptop sleeve or folio specs. Mention lining options and device sizes once finalized.",
    status: "In sampling",
    leadTime: "Add next availability date or sample window.",
  },
  {
    name: "Utility Pouch",
    price: "$90",
    description:
      "Placeholder for small goods. Call out strap options, colors, and closures when ready.",
    status: "Made to order",
    leadTime: "Set your production cadence or inventory count.",
  },
];

const materialKits = [
  {
    title: "Sheet set (3 pcs)",
    price: "$240",
    detail:
      "Drop dimensions, thickness, and finish here. Ideal for makers who want ready-to-stitch material.",
  },
  {
    title: "Workshop pack",
    price: "$480",
    detail:
      "Bundle price placeholder for education kits. Replace with tool list, number of seats, or facilitator hours.",
  },
  {
    title: "Wholesale tier",
    price: "$45 / sheet (50+)",
    detail:
      "Use this row for bulk pricing notes, MOQs, and freight expectations.",
  },
];

export default function ProductsPage() {
  return (
    <div className="warm-bg relative min-h-screen overflow-hidden text-ink">
      <div className="absolute inset-0" />

      <Navbar />

      <header className="relative z-10 mx-auto flex max-w-5xl flex-col gap-5 px-6 py-16 text-left">
        <p className="text-xs uppercase tracking-[0.16em] text-amber-warm/70">
          Products
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
          Symbia product line &amp; pricing
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-ink/65">
          Swap these placeholders with your final SKUs, photos, and pricing.
          Each card keeps space for specs, lead times, and notes so partners can
          see how to order.
        </p>
      </header>

      <main className="relative z-10 mx-auto flex max-w-5xl flex-col gap-14 px-6 pb-20">

        {/* ── Product lineup ── */}
        <section
          className="space-y-6"
          aria-label="Product line placeholders and prices"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-[0.14em] text-amber-warm/70">Our range</p>
              <h2 className="font-display text-2xl font-bold text-ink">
                Product lineup
              </h2>
            </div>
            <p className="text-sm text-ink/50">
              Update names, prices, and lead times as drops go live.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {productLines.map((product) => (
              <article
                key={product.name}
                className="flex h-full flex-col gap-4 rounded-2xl border border-ink/15 bg-earth/40 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-xl border border-dashed border-ink/20 bg-black/30">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
                    <span className="text-xs uppercase tracking-[0.1em] text-ink/40">Drop product photo here</span>
                    <span className="text-[11px] text-ink/30">
                      Replace with final asset or render
                    </span>
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-ink">
                      {product.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink/65">
                      {product.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs uppercase tracking-[0.1em] text-amber-warm/60">
                      {product.status}
                    </p>
                    <p className="font-display text-xl font-bold text-coral">
                      {product.price}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-ink/40">{product.leadTime}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Material kits ── */}
        <section
          className="rounded-2xl border border-ink/15 bg-earth/40 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur"
          aria-label="Material kits and bundles"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-amber-warm/70">
                Material kits
              </p>
              <h2 className="font-display text-2xl font-bold text-ink">
                Stock &amp; bundles
              </h2>
            </div>
            <p className="text-sm text-ink/50">
              Use this block to share material-only pricing or training packs.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {materialKits.map((kit) => (
              <div
                key={kit.title}
                className="flex flex-col gap-3 rounded-xl border border-ink/10 bg-black/20 p-5 shadow-inner shadow-black/40"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-sm font-bold text-ink">
                    {kit.title}
                  </p>
                  <p className="text-sm font-semibold text-coral">{kit.price}</p>
                </div>
                <p className="text-sm leading-relaxed text-ink/60">{kit.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Ordering notes ── */}
        <section
          className="grid gap-6 rounded-2xl border border-ink/15 bg-earth/40 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur md:grid-cols-[1.2fr_0.8fr]"
          aria-label="Ordering notes and customization"
        >
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.14em] text-amber-warm/70">
              Ordering notes
            </p>
            <h3 className="font-display text-xl font-bold text-ink">
              Customize this page with your launch details
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed text-ink/65">
              <li>— Replace price placeholders and badges as inventory updates.</li>
              <li>— Add SKU codes, sizes, and colorways under each card.</li>
              <li>— Note MOQs, payment terms, or shipping windows here.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-ink/10 bg-black/20 p-6 shadow-inner shadow-black/40">
            <p className="text-sm leading-relaxed text-ink/70">
              Want this to route straight to purchasing? Swap the contact button
              below with a checkout link, or add a short form here to capture
              quantity, finish, and delivery date.
            </p>
            <p className="mt-4 text-sm text-ink/50">
              For bespoke collaborations, keep this note or replace it with
              partner logos once deals are live.
            </p>
          </div>
        </section>

        <ContactSection email={CONTACT_EMAIL} />
      </main>
    </div>
  );
}
