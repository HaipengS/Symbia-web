import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * The two external origins in the policy are both the video facade in
 * components/VideoEmbed: the poster comes from i.ytimg.com and the player, once
 * clicked, is an iframe on youtube-nocookie.com. Everything else the browser loads
 * is same-origin, including both typefaces, since next/font self-hosts the Google
 * one at build time. The press links, Instagram and LinkedIn are anchors rather
 * than resource loads, so they need nothing here, and Google's APIs are only ever
 * called from the server.
 *
 * script-src carries 'unsafe-inline' because Next puts its bootstrap and its
 * flight data in inline script tags. Removing it means giving each of them a nonce,
 * which means a middleware on every request. That is worth doing if this site ever
 * renders user input as markup; it does not, and the one template that turns input
 * into HTML is the notification email, which escapes it. 'unsafe-eval' and the
 * websocket origin are added in development only, where the dev server needs them.
 */

const dev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com",
  "font-src 'self' data:",
  `connect-src 'self'${dev ? " ws: http://localhost:*" : ""}`,
  "frame-src https://www.youtube-nocookie.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(dev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          // frame-ancestors covers this for anything current. Kept for browsers
          // that honour only the older header.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Only meaningful over HTTPS, which the host terminates.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
