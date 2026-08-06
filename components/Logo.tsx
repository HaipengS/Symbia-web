import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

type LogoProps = {
  className?: string;
  animated?: boolean;
  delay?: number;
  label?: string;
  /** Small, content-trimmed navbar mark (matches the logo docked in the home navbar). */
  mark?: boolean;
  /**
   * Which artwork to inline. "wordmark" is the lettering used by the hero and the
   * navbar; "emblem" is the square mark, which reads as a different object at small
   * sizes and so distinguishes the footer from the navbar.
   */
  variant?: "wordmark" | "emblem";
  /**
   * Rendered HEIGHT of the emblem in px; its width follows the artwork's own
   * proportions, which are roughly 1:2. Ignored by the wordmark.
   */
  emblemSize?: number;
  /**
   * Namespace for the artwork's internal ids. Defaults to something derived from the
   * other props, which is enough while each variant appears at most once per page.
   * Pass a distinct value if you ever render two logos that share those props, or
   * their clip paths will collide and the later one will not draw.
   */
  idScope?: string;
};

// The wordmark's tight content box (measured with getBBox in the browser). The "mark"
// variant crops to it so the small navbar logo has no surrounding padding — matching the
// logo LogoIntro docks in the animated home navbar. Update if the source SVG art changes.
const MARK_VIEWBOX =
  "15.912353515625 91.95791625976562 1398.2940673828125 555.3970947265625";
const NAVBAR_LOGO_HEIGHT = 22;

const LOGO_PATH = path.join(
  process.cwd(),
  "public",
  "Font",
  "symbia website font.svg",
);
// Filename is spelled "symbla" in the repo.
const EMBLEM_PATH = path.join(process.cwd(), "public", "symbla logo.svg");

// The emblem is a vertically stacked wordmark drawn in the middle of a 1500x1500
// canvas, so 57% of that square is empty air. Fitted to a square box the artwork
// renders at under half the intended width. These are its real content bounds,
// measured with getBBox in the browser exactly as MARK_VIEWBOX above was; update
// both if the source art changes.
const EMBLEM_VIEWBOX = "408.5 51.3 647.4 1314.8";
const EMBLEM_ASPECT = 647.4 / 1314.8;
const LETTER_STAGGER = 0.1;

const readLogoSvg = cache(() => readFile(LOGO_PATH, "utf8"));
const readEmblemSvg = cache(() => readFile(EMBLEM_PATH, "utf8"));

/**
 * Both artworks clip every glyph through `url(#id)` references to their own
 * `<clipPath>` defs. Ids are document-global, so a second copy of the same file
 * resolves those references against the FIRST copy in the document, and is then
 * clipped by geometry that belongs to something else. Worse, when that first copy
 * is hidden the later copies clip to nothing and disappear, which is exactly what
 * happened when the footer began rendering the same wordmark as the navbar: it
 * showed until the hero drop finished and hid the hero, then vanished.
 *
 * Suffixing every id keeps each copy self-contained. The suffix is derived from the
 * props rather than a counter so rendering stays pure; `idScope` is the escape hatch
 * for rendering two logos that would otherwise derive the same one.
 */
function namespaceIds(markup: string, suffix: string) {
  return markup
    .replace(/id="([^"]+)"/g, `id="$1-${suffix}"`)
    .replace(/url\(#([^)]+)\)/g, `url(#$1-${suffix})`)
    .replace(/(xlink:href|href)="#([^"]+)"/g, `$1="#$2-${suffix}"`);
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * The exported SVG sizes itself at 1920x1080; the stage drives the real size,
 * so the intrinsic width/height are dropped in favour of the viewBox.
 */
function buildRootTag(openTag: string, label: string, mark: boolean) {
  let stripped = openTag.replace(
    /\s+(?:width|height|class|role|aria-label|focusable)="[^"]*"/g,
    "",
  );
  if (mark) {
    stripped = stripped.replace(/\s+viewBox="[^"]*"/, ` viewBox="${MARK_VIEWBOX}"`);
  }
  const markStyle = mark ? ' style="display:block;height:100%;width:auto"' : "";

  return stripped.replace(
    />$/,
    ` class="symbia-drop-svg" role="img" aria-label="${escapeAttribute(label)}" focusable="false"${markStyle}>`,
  );
}

/**
 * Each letter is a top-level <g> carrying its own positioning matrix, which a
 * CSS transform on that same element would clobber — so every letter gets an
 * animation-only wrapper instead. Depth counting keeps nested <g> untouched.
 */
function wrapLetterGroups(body: string, delay: number) {
  const tagPattern = /<(\/?)g\b[^>]*>/g;
  let markup = "";
  let cursor = 0;
  let depth = 0;
  let letterStart = -1;
  let letterIndex = 0;
  let match: RegExpExecArray | null;

  function wrap(group: string) {
    const letterDelay = Number(
      (delay + letterIndex * LETTER_STAGGER).toFixed(3),
    );
    letterIndex += 1;

    return `<g class="symbia-drop-letter" style="--d:${letterDelay}s">${group}</g>`;
  }

  while ((match = tagPattern.exec(body)) !== null) {
    const isClosing = match[1] === "/";
    const isSelfClosing = match[0].endsWith("/>");

    if (isClosing) {
      depth -= 1;

      if (depth === 0 && letterStart !== -1) {
        const end = match.index + match[0].length;
        markup += body.slice(cursor, letterStart);
        markup += wrap(body.slice(letterStart, end));
        cursor = end;
        letterStart = -1;
      }

      continue;
    }

    if (isSelfClosing) {
      if (depth === 0) {
        markup += body.slice(cursor, match.index);
        markup += wrap(match[0]);
        cursor = match.index + match[0].length;
      }

      continue;
    }

    if (depth === 0) {
      letterStart = match.index;
    }

    depth += 1;
  }

  return markup + body.slice(cursor);
}

function buildSvg(
  svgText: string,
  animated: boolean,
  delay: number,
  label: string,
  mark: boolean,
) {
  const rootMatch = /<svg\b[^>]*>/.exec(svgText);

  if (!rootMatch) {
    throw new Error("Unable to parse Symbia logo SVG: no <svg> root.");
  }

  const rootEnd = rootMatch.index + rootMatch[0].length;
  const defsEnd = svgText.indexOf("</defs>", rootEnd);
  // <defs> holds a <g> of its own — start scanning past it so only the letters wrap.
  const bodyStart = defsEnd === -1 ? rootEnd : defsEnd + "</defs>".length;
  const defs = svgText.slice(rootEnd, bodyStart);
  const body = svgText.slice(bodyStart);

  return (
    buildRootTag(rootMatch[0], label, mark) +
    defs +
    (animated ? wrapLetterGroups(body, delay) : body)
  );
}

/**
 * Square emblem: keep the artwork's own viewBox and let the wrapper set the size.
 *
 * The file is drawn in flat white, for use on a dark ground, so it is invisible on
 * the light pages as shipped. Its fills become `currentColor` and the colour is left
 * to CSS, which also means the same file works on a dark section later.
 */
function buildEmblem(svgText: string, label: string) {
  const rootMatch = /<svg\b[^>]*>/.exec(svgText);

  if (!rootMatch) {
    throw new Error("Unable to parse Symbia emblem SVG: no <svg> root.");
  }

  const openTag = rootMatch[0]
    .replace(/\s+(?:width|height|class|role|aria-label|focusable)="[^"]*"/g, "")
    .replace(/\s+viewBox="[^"]*"/, ` viewBox="${EMBLEM_VIEWBOX}"`)
    .replace(
      />$/,
      ` role="img" aria-label="${escapeAttribute(label)}" focusable="false"` +
        ` style="display:block;width:100%;height:100%">`,
    );

  const body = svgText
    .slice(rootMatch.index + rootMatch[0].length)
    .replace(/fill="#(?:fff|ffffff)"/gi, 'fill="currentColor"');

  return openTag + body;
}

export default async function Logo({
  className,
  animated = false,
  delay = 0,
  label = "Symbia",
  mark = false,
  variant = "wordmark",
  emblemSize = 34,
  idScope,
}: LogoProps) {
  const suffix =
    idScope ??
    [variant === "emblem" ? "em" : "wm", animated ? "anim" : null, mark ? "mark" : null]
      .filter(Boolean)
      .join("-");

  if (variant === "emblem") {
    const emblemText = await readEmblemSvg();

    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          width: `${Math.round(emblemSize * EMBLEM_ASPECT * 100) / 100}px`,
          height: `${emblemSize}px`,
          lineHeight: 0,
        }}
        dangerouslySetInnerHTML={{
          __html: namespaceIds(buildEmblem(emblemText, label), suffix),
        }}
      />
    );
  }

  const svgText = await readLogoSvg();

  return (
    <span
      className={joinClassNames("symbia-drop-stage", className)}
      // The "mark" variant sizes itself to the navbar inline, overriding the stage's
      // default sizing so it never depends on globals.css (which can be stale in dev).
      style={
        mark
          ? {
              display: "inline-flex",
              alignItems: "center",
              width: "auto",
              height: `${NAVBAR_LOGO_HEIGHT}px`,
              aspectRatio: "auto",
              minHeight: 0,
              lineHeight: 0,
            }
          : undefined
      }
      dangerouslySetInnerHTML={{
        __html: namespaceIds(buildSvg(svgText, animated, delay, label, mark), suffix),
      }}
    />
  );
}
