import Link from "next/link";
import Logo from "@/components/Logo";
import { CONTACT_EMAIL } from "@/lib/constants";

/**
 * Swiss-modernist footer. Four left-aligned blocks separated by whitespace alone:
 * no rules, no borders, no tinted blocks behind any column.
 *
 * The typography is deliberately flat. One size, one weight, one colour for
 * headings and body alike. A heading is a heading only because of the 48px of empty
 * space under it, which is the whole point of the arrangement, so nothing here
 * should acquire a larger size, a bolder weight or the display face.
 *
 * Columns start at 0, 19, 49 and 78% of the content width. The band between the
 * mark and the menu is deliberate and stays empty.
 */

const menuLeft = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Gallery", href: "/gallery" },
];

// Contact still points at the homepage section: the /contact route does not exist
// yet. One href to change once it does.
const menuRight = [
  { label: "About", href: "/about" },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/madewithsymbia/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/madewithsymbia/" },
];

const PHONE_DISPLAY = "Tel. +1 224 204 3240";
const PHONE_HREF = "tel:+12242043240";

/** One size, one weight, one colour. Everything in the footer uses this. */
const TEXT = "text-[1.0625rem] font-normal leading-[1.35] text-soft/80";
/** Colour shift only on hover, so nothing in the layout moves. */
const LINK = `${TEXT} transition-colors hover:text-soft focus-visible:text-soft`;
/** Line height 1.9 does the spacing; the items carry no margins of their own. */
const ITEM = "leading-[1.9]";
/** A heading is set apart by the space beneath it and by nothing else. */
const HEADING_GAP = "mb-12";

function MenuList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.label} className={ITEM}>
          <Link href={item.href} className={LINK}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="bg-earth">
      <div className="mx-auto w-full max-w-[1720px] px-6 pb-20 pt-24 md:px-10 min-[900px]:pt-[7.5rem] lg:px-14">
        {/* Tracks are the distance from one start to the next, so each block begins
            exactly on its percentage. Two columns between 700 and 900: four at that
            width puts the email address in a 154px track, which overflows. */}
        {/* gap-x is zeroed at 900: the percentages already contain the gutters, so a
            column gap on top of them pushes every start to the right. The gutters
            come from the right padding on the middle two blocks instead. */}
        <div className="grid grid-cols-1 gap-y-14 text-left min-[700px]:grid-cols-2 min-[700px]:gap-x-16 min-[900px]:grid-cols-[19%_30%_29%_22%] min-[900px]:items-start min-[900px]:gap-x-0 min-[900px]:gap-y-0">
          {/* Dropped by the height of a heading plus its 48px gap, so the mark starts
              on the same line as the first item in every other column rather than up
              level with the headings. */}
          <div className="min-[900px]:pt-[4.4375rem]">
            <Link
              href="/"
              aria-label="Symbia home"
              className="inline-flex text-soft transition-opacity hover:opacity-75"
            >
              <Logo variant="emblem" emblemSize={90} label="Symbia" />
            </Link>
            <p className={`${TEXT} mt-8`}>Est. 2023</p>
          </div>

          <div className="min-[900px]:pr-[4.5rem]">
            <p className={`${TEXT} ${HEADING_GAP}`}>Menu</p>
            {/* 3 + 3 down to 700. The inner gutter is 28px against a 72px outer one, so
                the pair still reads as one column rather than as two of four. It holds
                below 900 as well: a single list of six there is 263px tall against the
                145px mark beside it, which opens a hole in the left column. Only the
                one-column layout gets the list of six. */}
            <div className="hidden min-[700px]:grid min-[700px]:grid-cols-2 min-[700px]:gap-x-7">
              <MenuList items={menuLeft} />
              <MenuList items={menuRight} />
            </div>
            <div className="min-[700px]:hidden">
              <MenuList items={[...menuLeft, ...menuRight]} />
            </div>
          </div>

          <div className="min-[900px]:pr-[4.5rem]">
            <p className={`${TEXT} ${HEADING_GAP}`}>Address</p>
            {/* Held to a measure that breaks the address over three lines. */}
            <address className={`${TEXT} max-w-[17rem] not-italic leading-[1.9]`}>
              Symbia, 2311 N Campus Dr, Evanston, IL 60208. United States.
            </address>
          </div>

          <div>
            <p className={`${TEXT} ${HEADING_GAP}`}>Contact</p>
            <ul>
              <li className={ITEM}>
                <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className={ITEM}>
                <a href={PHONE_HREF} className={LINK}>
                  {PHONE_DISPLAY}
                </a>
              </li>
              {/* The blank line is a list item so the rhythm stays on the same grid. */}
              <li className={ITEM} aria-hidden>
                &nbsp;
              </li>
              {socials.map((s) => (
                <li key={s.label} className={ITEM}>
                  <a href={s.href} target="_blank" rel="noreferrer" className={LINK}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom left, on the mark's own left edge. */}
        <p className={`${TEXT} mt-14`}>&copy; 2026 Symbia</p>
      </div>
    </footer>
  );
}
