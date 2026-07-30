import "server-only";

/**
 * Appends waitlist signups to the "Symbia Waitlist" Google Sheet, which is the
 * internal tracker Rayden works out of.
 *
 * No SDK: a service account's RS256 assertion is signed with node:crypto and
 * exchanged for an access token, then the REST endpoint is called with fetch.
 * That keeps the dependency list unchanged and works unmodified on serverless.
 *
 * The service account can only see sheets it has been shared into, so a new
 * target sheet needs GOOGLE_SHEETS_CLIENT_EMAIL added as an Editor first.
 */

const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const SHEET_ID = process.env.WAITLIST_SHEET_ID;
const TAB = process.env.WAITLIST_SHEET_TAB ?? "Sheet1";

const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API = "https://sheets.googleapis.com/v4/spreadsheets";

const configured = Boolean(CLIENT_EMAIL && PRIVATE_KEY && SHEET_ID);

export type SheetOutcome =
  | { ok: true; duplicate?: false }
  | { ok: true; duplicate: true }
  | { ok: false; skipped: true }
  | { ok: false; skipped?: false; error: string };

export type WaitlistRow = {
  name: string | null;
  email: string;
  /** Which surface the signup came from, e.g. "scroll-popup" or "navbar". */
  source: string;
};

// Env vars can't carry real newlines, so the key is stored with escaped ones.
const decodeKey = (key: string) => key.replace(/\\n/g, "\n");

const base64Url = (input: Buffer | string) =>
  Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

// Tokens last an hour; caching one keeps a burst of signups to a single exchange.
let cached: { token: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cached && cached.expiresAt > now + 60) return cached.token;

  const { createSign } = await import("node:crypto");
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(
    JSON.stringify({
      iss: CLIENT_EMAIL,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const assertion = `${header}.${claims}.${base64Url(
    signer.sign(decodeKey(PRIVATE_KEY as string)),
  )}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  const json = (await res.json()) as { access_token?: string; error_description?: string };
  if (!res.ok || !json.access_token) {
    throw new Error(json.error_description ?? `token exchange failed (${res.status})`);
  }

  cached = { token: json.access_token, expiresAt: now + 3600 };
  return json.access_token;
}

/**
 * Sheets has no unique constraint, so the email column is read before appending.
 * This is what stops the same person from filling the tracker with duplicates now
 * that the sheet, rather than a database, is the record of signups.
 */
async function emailExists(token: string, email: string): Promise<boolean> {
  const range = `${encodeURIComponent(TAB)}!C2:C`;
  const res = await fetch(`${API}/${SHEET_ID}/values/${range}?majorDimension=COLUMNS`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`reading existing emails failed (${res.status})`);
  const json = (await res.json()) as { values?: string[][] };
  const column = json.values?.[0] ?? [];
  return column.some((value) => value.trim().toLowerCase() === email);
}

// Written in Symbia's own timezone so the tracker reads correctly to the team,
// and in a shape that still sorts lexicographically.
function timestamp(): string {
  return new Date()
    .toLocaleString("en-CA", {
      timeZone: "America/Chicago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(",", "");
}

/**
 * Best-effort by design: callers should log a failure rather than fail the
 * signup, so a Google outage never costs Symbia an email address.
 */
export async function appendWaitlistRow(row: WaitlistRow): Promise<SheetOutcome> {
  if (!configured) {
    console.warn(
      "[sheets] GOOGLE_SHEETS_CLIENT_EMAIL / GOOGLE_SHEETS_PRIVATE_KEY / WAITLIST_SHEET_ID not all set, skipping waitlist row.",
    );
    return { ok: false, skipped: true };
  }

  const email = row.email.trim().toLowerCase();

  try {
    const token = await accessToken();

    if (await emailExists(token, email)) {
      return { ok: true, duplicate: true };
    }

    const range = `${encodeURIComponent(TAB)}!A:F`;
    const res = await fetch(
      `${API}/${SHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[timestamp(), row.name ?? "", email, row.source, "new", ""]],
        }),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const detail = (await res.json().catch(() => null)) as {
        error?: { message?: string };
      } | null;
      throw new Error(detail?.error?.message ?? `append failed (${res.status})`);
    }

    return { ok: true };
  } catch (e) {
    console.error("[sheets] waitlist append failed", e);
    return { ok: false, error: e instanceof Error ? e.message : "unknown error" };
  }
}
