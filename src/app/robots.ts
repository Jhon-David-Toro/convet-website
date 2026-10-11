import type { MetadataRoute } from "next";

import { PRIVATE_PATHS, SITE_URL } from "@/lib/seo.constants";

/**
 * Rules for search engine crawlers: the public site can be crawled, the private areas (staff, admin, customer app, booking and sign-in) cannot.
 *
 * @returns The robots rules and the address of the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS }, sitemap: `${SITE_URL}/sitemap.xml` };
}
