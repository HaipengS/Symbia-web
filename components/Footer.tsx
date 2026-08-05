import Link from "next/link";
import Logo from "@/components/Logo";
import { CONTACT_EMAIL } from "@/lib/constants";

/**
 * Three columns on a dark ground, each centred inside its own track.
 *
 * No rules and no tint: centring each column is what separates them, so the
 * dividers the previous version needed are gone. The ground is `earth`, the same
 * dark the figures band on /impact uses, so the two read as one device rather than
 * as two unrelated dark patches.
 *
 * Contact is deliberately missing from the menu. That route does not exist yet.
 */

const menu = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Impact", href: "/impact" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/madewithsymbia/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/madewithsymbia/" },
];

const PHONE_DISPLAY = "+1 224 204 3240";
const PHONE_HREF = "tel:+12242043240";

const BLOCK_HEADING = "font-display text-3xl leading-none text-soft md:text-[2rem]";
const FOOTER_LINK =
  "text-base text-soft/70 transition-colors hover:text-soft focus-visible:text-soft";

export default function Footer() {
  return (
    <footer className="bg-earth">
      <div className="mx-auto w-full max-w-[1720px] px-6 py-16 text-center md:px-10 md:py-20 lg:px-14">
        {/* items-center, not the default start. Aligned at the top the three blocks
            put their headings on one line but their centres on three different ones,
            because each holds a different amount. Centred, they share one axis. */}
        {/* Four across only from lg. At md the four tracks are about 185px each and
            the email address very nearly fills one; a tablet gets a roomier 2x2. */}
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 sm:items-center sm:gap-x-8 lg:grid-cols-4 lg:gap-12">
        {/* Mark and what the company is. */}
        <div className="flex flex-col items-center gap-8">
          <Link
            href="/"
            aria-label="Symbia home"
            className="inline-flex text-soft transition-opacity hover:opacity-75"
          >
            <Logo variant="emblem" emblemSize={104} label="Symbia" />
          </Link>
          <p className="max-w-[24ch] text-base leading-[1.6] text-soft/70">
            Leather grown from recycled kombucha, not tanned.
          </p>
          <div className="flex flex-col gap-1 text-base text-soft/45">
            <p>Symbia</p>
            <p>Est. 2023</p>
          </div>
        </div>

        {/* Menu. Same job as the bar at the top, arranged so it cannot be mistaken
            for it: one centred column rather than a horizontal row. */}
        <div className="flex flex-col items-center gap-8">
          <h2 className={BLOCK_HEADING}>Menu</h2>
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-4">
              {menu.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={FOOTER_LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Where we are. Its own column now: bundled under Contact it made that block
            twice the height of the others and there is nothing to reach it by. */}
        <div className="flex flex-col items-center gap-8">
          <h2 className={BLOCK_HEADING}>Address</h2>
          <address className="not-italic text-base leading-[1.7] text-soft/70">
            2311 N Campus Dr
            <br />
            Evanston, IL 60208
          </address>
        </div>

        {/* How to reach us. */}
        <div className="flex flex-col items-center gap-8">
          <h2 className={BLOCK_HEADING}>Contact</h2>
          <div className="flex flex-col gap-3">
            <a href={`mailto:${CONTACT_EMAIL}`} className={FOOTER_LINK}>
              {CONTACT_EMAIL}
            </a>
            <a href={PHONE_HREF} className={FOOTER_LINK}>
              {PHONE_DISPLAY}
            </a>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={FOOTER_LINK}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        </div>

        {/* Out of the left column and onto the page's own centre line. Sitting inside
            that column it also made the column taller than the other two, which is
            what pushed their centres apart. */}
        <p className="mt-16 text-[0.8125rem] uppercase tracking-[0.16em] text-soft/35 md:mt-20">
          &copy; 2026 Symbia
        </p>
      </div>
    </footer>
  );
}
