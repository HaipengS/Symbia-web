import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Contact | Symbia",
  description:
    "Reach Symbia about the material, about supplying an organic by-product, about a workshop, or about press. Email rayden@symbia.studio or write from this page.",
};

/**
 * A page of its own, per the brief: "make a separate page and don't have it link
 * back to the home page. Along with the contact form, list rayden@symbia.studio and
 * our Instagram (@madewithsymbia)." So the form stays and is the centre of the page,
 * the two channels are listed beside it as blocks of their own, and nothing here
 * points at the home page.
 *
 * The shape follows the references. Polybion gives email, phone and each address
 * their own labelled block rather than burying them under the form, which is what
 * the sidebar does. Modern Synthesis sorts enquiries by who is writing before it
 * collects anything, which is what the topic row does.
 */

const SECTION_LABEL =
  "text-[0.875rem] font-medium uppercase tracking-[0.16em] text-amber-warm/80";

const channels = [
  {
    term: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    term: "Instagram",
    value: "@madewithsymbia",
    href: "https://www.instagram.com/madewithsymbia/",
  },
  {
    term: "LinkedIn",
    value: "Symbia",
    href: "https://www.linkedin.com/company/madewithsymbia/",
  },
  {
    term: "Telephone",
    value: "+1 224 204 3240",
    href: "tel:+12242043240",
  },
  {
    term: "Where we are",
    value: "2311 N Campus Dr, Evanston, IL 60208",
    href: null,
  },
];

// Each entry answers one of the topic options. Every figure here is one the site
// already publishes on /impact and /about, not a new claim.
const guidance = [
  {
    title: "If you want material",
    body: "Tell us the product, roughly how much surface area it takes, and when you need it. Sheet size and lead time depend on all three, so a message that has them gets answered in one reply rather than three.",
  },
  {
    title: "If you want a session",
    body: "Sessions have run in villages, local schools and vocational education centres across five provinces, and they have been free to attend in every case so far. Where you are decides more than the date does.",
  },
  {
    title: "If you are writing about us",
    body: "The material is Kombucha Bioleather, grown from fermented tea rather than tanned from a hide. The story so far is on About, and the teaching and offsetting work is on Impact.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <header className="mx-auto w-full max-w-[1720px] px-6 pb-14 pt-16 text-center md:px-10 md:pb-16 md:pt-24 lg:px-14">
        <p className={SECTION_LABEL}>Contact</p>
        <h1 className="mx-auto mt-6 max-w-[20ch] font-display text-5xl leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Tell us which of these you are.
        </h1>
        <p className="mx-auto mt-7 max-w-[62ch] text-lg leading-[1.65] text-ink/65">
          Four quite different conversations arrive at the same address. Saying which
          one you are starting means the reply can be useful the first time.
        </p>
      </header>

      <section
        aria-label="Contact Symbia"
        className="mx-auto w-full max-w-[1720px] px-6 pb-20 md:px-10 md:pb-28 lg:px-14"
      >
        <ContactForm
          aside={
            <aside className="flex flex-col gap-10">
              <div>
                <p className={SECTION_LABEL}>Or reach us directly</p>
                <dl className="mt-6 flex flex-col border-t border-ink/12">
                  {channels.map((c) => (
                    <div
                      key={c.term}
                      className="flex flex-col gap-1 border-b border-ink/12 py-4"
                    >
                      <dt className="text-[0.75rem] uppercase tracking-[0.13em] text-amber-warm/80">
                        {c.term}
                      </dt>
                      <dd className="text-base leading-[1.5] text-ink/75">
                        {c.href ? (
                          <a
                            href={c.href}
                            target={c.href.startsWith("http") ? "_blank" : undefined}
                            rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                            className="underline decoration-ink/20 underline-offset-4 transition hover:text-coral"
                          >
                            {c.value}
                          </a>
                        ) : (
                          c.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* The sidebar is far shorter than the form beside it. A frame closes
                  that rather than padding does, and drape.jpg is the one material
                  photograph no other page uses. */}
              <figure className="flex flex-col gap-3">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-cream">
                  <Image
                    src="/material/drape.jpg"
                    alt="A sheet of Kombucha Bioleather falling into a fold, showing how it drapes"
                    fill
                    sizes="(min-width: 1024px) 22rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-[0.6875rem] uppercase tracking-[0.16em] text-ink/50">
                  Kombucha Bioleather, grown not tanned
                </figcaption>
              </figure>
            </aside>
          }
        />
      </section>

      <section aria-label="What to include" className="bg-earth py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1720px] px-6 md:px-10 lg:px-14">
          <p className="text-[0.875rem] font-medium uppercase tracking-[0.16em] text-soft/60">
            What to include
          </p>
          <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-10 lg:gap-16">
            {guidance.map((g) => (
              <div key={g.title} className="flex flex-col gap-4 border-t border-soft/20 pt-6">
                <h2 className="font-display text-2xl leading-[1.15] text-soft md:text-[1.75rem]">
                  {g.title}
                </h2>
                <p className="text-base leading-[1.75] text-soft/60">{g.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 text-base leading-[1.7] text-soft/55">
            More on the material and where it came from is on{" "}
            <Link
              href="/about"
              className="text-soft underline decoration-soft/30 underline-offset-4 transition hover:decoration-soft"
            >
              About
            </Link>
            , and the teaching and offsetting work is on{" "}
            <Link
              href="/impact"
              className="text-soft underline decoration-soft/30 underline-offset-4 transition hover:decoration-soft"
            >
              Impact
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
