import "server-only";

import { headers } from "next/headers";

/**
 * A sliding window per client, held in memory.
 *
 * Be clear about what this is worth. The state lives in one server instance, so
 * on a serverless host it is per-lambda and resets on a cold start: someone
 * determined, or spread across enough instances, gets more than the limit says.
 * What it does stop is the ordinary case, one script hammering one endpoint,
 * which is what would otherwise fill the waitlist tracker with junk and Rayden's
 * inbox with mail. A limit that holds globally needs a shared store, which means
 * a Redis or a KV binding and a dependency this project has so far avoided.
 *
 * Checked BEFORE a submission is validated, so probing for valid input costs an
 * attacker the same as sending it.
 */

type Window = { hits: number[] };

const buckets = new Map<string, Window>();

// An attacker rotating addresses would otherwise grow this map without limit.
// Well above the number of real visitors in any window.
const MAX_KEYS = 10_000;

function prune(now: number, windowMs: number) {
  for (const [key, window] of buckets) {
    window.hits = window.hits.filter((t) => now - t < windowMs);
    if (window.hits.length === 0) buckets.delete(key);
  }
}

/**
 * The address the request came from. Behind a proxy the socket address is the
 * proxy's, so the forwarded header is what identifies the client; its first entry
 * is the original client and the rest are the hops.
 */
export async function clientKey(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

export type RateVerdict = { allowed: true } | { allowed: false; retryAfterSeconds: number };

export function check(key: string, limit: number, windowMs: number): RateVerdict {
  const now = Date.now();

  if (buckets.size > MAX_KEYS) prune(now, windowMs);

  const window = buckets.get(key) ?? { hits: [] };
  window.hits = window.hits.filter((t) => now - t < windowMs);

  if (window.hits.length >= limit) {
    const oldest = window.hits[0];
    buckets.set(key, window);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)),
    };
  }

  window.hits.push(now);
  buckets.set(key, window);
  return { allowed: true };
}

/** Five in a quarter of an hour: past anything a person does, short of a script. */
export const FORM_LIMIT = 5;
export const FORM_WINDOW_MS = 15 * 60 * 1000;

/** The message both forms show. Deliberately vague about the limit itself. */
export const TOO_MANY =
  "That is a lot of messages in a short time. Please wait a few minutes and try again.";
