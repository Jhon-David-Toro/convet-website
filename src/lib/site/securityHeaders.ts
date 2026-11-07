/** Header sent on every response. */
export type SecurityHeader = { key: string; value: string };

type PolicyOptions = {
  /** Development needs `eval` for React's debugging tools; production must not allow it. */
  development: boolean;
  /** Cloudinary host that serves the photos, when configured. */
  imageHosts: string[];
};

/**
 * Content Security Policy of the site. Everything is limited to the site's own origin except what the pages really use:
 * photos from Cloudinary and the Google Maps embed. `unsafe-inline` stays for scripts and styles because Next.js injects inline
 * bootstrap scripts and styles; moving to per-request nonces needs fully dynamic rendering and is left as a follow-up.
 *
 * @param options Environment of the build, see {@link PolicyOptions}.
 * @returns The policy as a single header value.
 */
export function contentSecurityPolicy({ development, imageHosts }: PolicyOptions): string {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob:${imageHosts.map((host) => ` ${host}`).join("")}`,
    "font-src 'self'",
    "connect-src 'self'",
    "frame-src https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(development ? [] : ["upgrade-insecure-requests"]),
  ];
  return directives.join("; ");
}

/**
 * Headers for every page: CSP, MIME sniffing, framing, referrer, browser features, cross-origin isolation and, in production, HSTS.
 *
 * @param options Environment of the build, see {@link PolicyOptions}.
 * @returns The headers to send.
 */
export function securityHeaders(options: PolicyOptions): SecurityHeader[] {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(options) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    ...(options.development ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]),
  ];
}

/** Pages and endpoints that depend on the signed-in user: no shared cache may keep them. */
export const PRIVATE_PATHS = ["/app/:path*", "/staff/:path*", "/admin/:path*", "/api/:path*", "/sign-in", "/sign-up"];

export const PRIVATE_CACHE_HEADER: SecurityHeader = { key: "Cache-Control", value: "private, no-store" };
