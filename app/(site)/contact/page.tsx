import Image from "next/image";
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

    </main>
  );
}
