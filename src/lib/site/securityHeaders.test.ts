import { describe, expect, it } from "vitest";

import { contentSecurityPolicy, PRIVATE_CACHE_HEADER, PRIVATE_PATHS, securityHeaders } from "./securityHeaders";

const PROD = { development: false, imageHosts: ["https://res.cloudinary.com"] };

describe("contentSecurityPolicy", () => {
  it("limits everything to the site except the photos and the map", () => {
    const policy = contentSecurityPolicy(PROD);
    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain("img-src 'self' data: blob: https://res.cloudinary.com");
    expect(policy).toContain("frame-src https://www.google.com");
    expect(policy).toContain("object-src 'none'");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("form-action 'self'");
    expect(policy).toContain("base-uri 'self'");
    expect(policy).toContain("upgrade-insecure-requests");
  });

  it("never allows eval in production, only in development", () => {
    expect(contentSecurityPolicy(PROD)).not.toContain("unsafe-eval");
    expect(contentSecurityPolicy({ development: true, imageHosts: [] })).toContain("'unsafe-eval'");
  });
});

describe("securityHeaders", () => {
  it("sends the hardening headers and HSTS only in production", () => {
    const keys = securityHeaders(PROD).map((header) => header.key);
    expect(keys).toEqual(expect.arrayContaining(["Content-Security-Policy", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy", "Cross-Origin-Opener-Policy", "Strict-Transport-Security"]));
    expect(securityHeaders({ development: true, imageHosts: [] }).map((header) => header.key)).not.toContain("Strict-Transport-Security");
  });
});

describe("private paths", () => {
  it("keeps the signed-in areas and the API out of shared caches", () => {
    expect(PRIVATE_CACHE_HEADER.value).toBe("private, no-store");
    expect(PRIVATE_PATHS).toEqual(expect.arrayContaining(["/app/:path*", "/staff/:path*", "/admin/:path*", "/api/:path*"]));
  });
});
