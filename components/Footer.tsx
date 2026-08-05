import Link from "next/link";
import Logo from "@/components/Logo";
import { CONTACT_EMAIL } from "@/lib/constants";

/**
 * Three blocks divided by vertical rules: the mark and the copyright on the left,
 * a menu in the middle, contact details on the right. Built after the Mycotech Lab
 * footer, which is the layout Rayden's reference is a simplified version of.
 *
 * The middle block carries a faint tint. It is a second navigation, so it has to
 * read as a distinct object from the bar at the top of the page rather than as a
 * repeat of it, and the tint is what does that without adding another rule.
 *
 * Contact is missing from the menu on purpose: that route does not exist yet. Add
 * it here the moment it does.
 */

const menu = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Impact", href: "/impact" },
  { label: "Gallery", href: "/gallery" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/madewithsymbia/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/madewithsymbia/" },
];

const PHONE_DISPLAY = "+1 224 204 3240";
const PHONE_HREF = "tel:+12242043240";

const BLOCK_HEADING = "font-display text-3xl leading-none text-ink md:text-[2rem]";
const FOOTER_LINK =
  "text-base text-ink/65 transition-colors hover:text-coral focus-visible:text-coral";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto grid w-full max-w-[1720px] grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,1.1fr)]">
        {/* Mark top, copyright pinned to the bottom of the block. */}
        <div className="flex flex-col justify-between gap-12 px-6 py-12 md:px-10 md:py-16 lg:pl-14">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              aria-label="Symbia home"
              className="inline-flex self-start text-ink transition-colors hover:text-coral"
            >
              <Logo variant="emblem" emblemSize={88} label="Symbia" />
            </Link>
            {/* The reference fills this block with award badges. We have none to show,
                so it carries the one line that says what the company is. */}
            <p className="max-w-[22ch] text-base leading-[1.5] text-ink/60">
              Leather grown from recycled kombucha, not tanned.
            </p>
          </div>
          <div className="flex flex-col gap-1 text-sm text-ink/45">
            <p>Symbia</p>
            <p>Est. 2023</p>
            <p className="mt-3 text-[0.8125rem] uppercase tracking-[0.14em] text-ink/35">
              &copy; 2026 Symbia
            </p>
          </div>
        </div>

        {/* Menu. Same job as the navbar, deliberately not the same object. */}
        <div className="border-t border-ink/10 bg-cream/40 px-6 py-12 md:border-l md:border-t-0 md:px-12 md:py-16">
          <h2 className={BLOCK_HEADING}>Menu</h2>
          <nav aria-label="Footer" className="mt-8 md:mt-10">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
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

        {/* Contact. */}
        <div className="border-t border-ink/10 px-6 py-12 md:border-l md:border-t-0 md:px-12 md:py-16 lg:pr-14">
          <h2 className={BLOCK_HEADING}>Contact</h2>
          {/* Two sub-columns, matching the menu's rhythm. Stacked in one narrow column
              the details filled about a third of the block and left the rest empty. */}
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 md:mt-10">
            <address className="text-base not-italic leading-relaxed text-ink/65">
              Symbia
              <br />
              2311 N Campus Dr
              <br />
              Evanston, IL 60208
            </address>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <a href={`mailto:${CONTACT_EMAIL}`} className={FOOTER_LINK}>
                  {CONTACT_EMAIL}
                </a>
                <a href={PHONE_HREF} className={FOOTER_LINK}>
                  {PHONE_DISPLAY}
                </a>
              </div>
              <ul className="flex flex-col gap-2">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
