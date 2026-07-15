import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

type LogoProps = {
  className?: string;
  animated?: boolean;
  delay?: number;
  label?: string;
};

const LOGO_PATH = path.join(
  process.cwd(),
  "public",
  "Font",
  "symbia website font.svg",
);
const LETTER_STAGGER = 0.1;

const readLogoSvg = cache(() => readFile(LOGO_PATH, "utf8"));

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
function buildRootTag(openTag: string, label: string) {
  const stripped = openTag.replace(
    /\s+(?:width|height|class|role|aria-label|focusable)="[^"]*"/g,
    "",
  );

  return stripped.replace(
    />$/,
    ` class="symbia-drop-svg" role="img" aria-label="${escapeAttribute(label)}" focusable="false">`,
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

function buildSvg(svgText: string, animated: boolean, delay: number, label: string) {
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
    buildRootTag(rootMatch[0], label) +
    defs +
    (animated ? wrapLetterGroups(body, delay) : body)
  );
}

export default async function Logo({
  className,
  animated = false,
  delay = 0,
  label = "Symbia",
}: LogoProps) {
  const svgText = await readLogoSvg();

  return (
    <span
      className={joinClassNames("symbia-drop-stage", className)}
      dangerouslySetInnerHTML={{
        __html: buildSvg(svgText, animated, delay, label),
      }}
    />
  );
}
