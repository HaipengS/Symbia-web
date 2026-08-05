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
 * Columns start at 0, 25, 55 and 84% of the content width. The band between the
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
        {/* fr rather than percentage tracks. The ratio 25:30:29:16 puts the starts on
            0, 25, 55 and 84%, but an fr track's automatic minimum is its min-content,
            so when the viewport cannot afford that ratio the Contact column holds its
            width and the other three give way instead of the email overflowing. Fixed
            percentages cannot do this: at 900 the old 22% track was 180px against the
            184px it needed.
            gap-x is zeroed at 900: the tracks already contain the gutters, so a column
            gap on top of them pushes every start to the right. */}
        <div className="grid grid-cols-1 gap-y-14 text-left min-[700px]:grid-cols-2 min-[700px]:gap-x-16 min-[900px]:grid-cols-[25fr_30fr_29fr_16fr] min-[900px]:items-start min-[900px]:gap-x-0 min-[900px]:gap-y-0">
          {/* The mark and its date share one vertical centre line. "Est. 2023" is the
              wider of the two, so the group is sized to it and the mark centres over
              it: the text keeps the column's left edge, in line with the copyright,
              and only the mark moves. Centring the text on a mark pinned to the left
              edge would instead push the text outside the page container.
              A 32px drop, matching the gap under the mark, sets the group below the
              heading line without taking it all the way down to the first item. */}
          <div className="flex w-fit flex-col items-center min-[900px]:pt-8">
            <Link
              href="/"
              aria-label="Symbia home"
              className="inline-flex text-soft transition-opacity hover:opacity-75"
            >
              <Logo variant="emblem" emblemSize={90} label="Symbia" />
            </Link>
            <p className={`${TEXT} mt-8`}>Est. 2023</p>
          </div>

          {/* No right padding on the middle two blocks any more. Under fr tracks it
              counted towards their min-content and made them claim width they did not
              need; the gutter is the space left over inside each track instead. */}
          <div>
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

          <div>
            <p className={`${TEXT} ${HEADING_GAP}`}>Address</p>
            {/* Held to a measure that breaks the address over three lines. Narrowed
                from 17rem when "Symbia," came off the front: at the old measure the
                shorter string fell to two lines. */}
            <address className={`${TEXT} max-w-[11.5rem] not-italic leading-[1.9]`}>
              2311 N Campus Dr, Evanston, IL 60208. United States.
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
              {/* Kept on one line so it counts towards the track's min-content floor
                  along with the unbreakable email address. */}
              <li className={`${ITEM} whitespace-nowrap`}>
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
