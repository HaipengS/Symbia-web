import Link from "next/link";
import Logo from "@/components/Logo";
import { CONTACT_EMAIL } from "@/lib/constants";

/**
 * Site footer, built on the structure Rayden pointed at in the brief: the mark on
 * the left, then Follow us / Address / Contact as three columns.
 *
 * Text links rather than icon buttons, which is what the reference does and what
 * the previous version could not do, since its three icons were decorative spans
 * with no accounts behind two of them. Adding a platform is one entry in `socials`.
 */

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/madewithsymbia/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/madewithsymbia/" },
];

const PHONE_DISPLAY = "+1 224 204 3240";
const PHONE_HREF = "tel:+12242043240";

const COLUMN_LABEL =
  "text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-amber-warm/70";
const FOOTER_LINK =
  "text-sm text-ink/60 transition-colors hover:text-coral focus-visible:text-coral";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto w-full max-w-[1720px] px-6 py-14 md:px-10 md:py-16 lg:px-14">
        {/* Four equal columns: the mark holds the first, the three information
            columns share the rest evenly. An `auto` track for the mark would let
            it absorb the slack and crowd the others against the right edge. */}
        <div className="grid gap-10 md:grid-cols-4 md:gap-8">
          <Link
            href="/"
            aria-label="Symbia home"
            className="inline-flex self-start text-ink transition-colors hover:text-coral"
          >
            {/* The square emblem rather than the wordmark, so the footer mark reads
                as a different object from the one sitting in the navbar. Its fills
                are currentColor, so the class above sets the colour. */}
            <Logo variant="emblem" emblemSize={52} label="Symbia" />
          </Link>

          <div className="flex flex-col gap-3">
            <p className={COLUMN_LABEL}>Follow us</p>
            <ul className="flex flex-col gap-1.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={FOOTER_LINK}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className={COLUMN_LABEL}>Address</p>
            <address className="text-sm not-italic leading-relaxed text-ink/60">
              2311 N Campus Dr
              <br />
              Evanston, IL 60208
            </address>
          </div>

          <div className="flex flex-col gap-3">
            <p className={COLUMN_LABEL}>Contact</p>
            <ul className="flex flex-col gap-1.5">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={FOOTER_LINK}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={PHONE_HREF} className={FOOTER_LINK}>
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6">
          <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink/35">
            &copy; 2026 Symbia
          </p>
        </div>
      </div>
    </footer>
  );
}
