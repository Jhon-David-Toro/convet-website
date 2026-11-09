import type { Metadata } from "next";

import { photoUrl } from "./photos";
import {
  CLINIC_COUNTRY,
  CLINIC_LOCALITY,
  CLINIC_OPENING_HOURS,
  CLINIC_STREET,
  CLINIC_TELEPHONE,
  SHARE_IMAGE_NAME,
  SHARE_IMAGE_TRANSFORM,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./seo.constants";

/**
 * Address of the image shown when a page is shared on social networks.
 *
 * @returns The address of the share image.
 */
export function shareImageUrl(): string {
  return photoUrl(SHARE_IMAGE_NAME, SHARE_IMAGE_TRANSFORM);
}

/**
 * Structured data (schema.org) that tells search engines the page is a veterinary clinic, with its address, phone and opening hours.
 *
 * @returns The JSON-LD object of the clinic.
 */
export function clinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: CLINIC_TELEPHONE,
    image: shareImageUrl(),
    address: { "@type": "PostalAddress", streetAddress: CLINIC_STREET, addressLocality: CLINIC_LOCALITY, addressCountry: CLINIC_COUNTRY },
    openingHoursSpecification: CLINIC_OPENING_HOURS.map(({ days, opens, closes }) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes })),
  };
}

/**
 * Serializes structured data to put inside a `script` tag: the `<` sign is escaped so the content can never close the tag.
 *
 * @param data Structured data to serialize.
 * @returns The JSON text.
 */
export function jsonLdText(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

type PageSeo = {
  /** Title of the page, without the site name. */
  title: string;
  description: string;
  /** Path of the page, e.g. `/services`; it becomes the canonical address. */
  path: string;
};

/**
 * Metadata of a public page: title, description, canonical address and the matching Open Graph and Twitter cards.
 * Pages that only set `title` and `description` would share the home page's card, so every public page goes through this.
 *
 * @param page Title, description and path of the page, see {@link PageSeo}.
 * @returns The metadata for `export const metadata` or `generateMetadata`.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = `${title} · ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE_NAME, title: fullTitle, description, url: path, locale: "en_AW", images: [shareImageUrl()] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImageUrl()] },
  };
}

/**
 * Structured data (schema.org) of a service of the clinic, so search engines can show it as a service offered by the clinic.
 *
 * @param service Name, description and path of the service.
 * @param service.name Name of the service.
 * @param service.description What the service is.
 * @param service.path Path of the service page.
 * @returns The JSON-LD object of the service.
 */
export function serviceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    areaServed: { "@type": "Country", name: "Aruba" },
    provider: { "@type": "VeterinaryCare", name: SITE_NAME, url: SITE_URL, telephone: CLINIC_TELEPHONE },
  };
}

/**
 * Structured data (schema.org) of the breadcrumb of a page, so search engines show the path instead of the address.
 *
 * @param trail Pages from the home to the current one, each with its name and path.
 * @returns The JSON-LD object of the breadcrumb.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(({ name, path }, index) => ({ "@type": "ListItem", position: index + 1, name, item: `${SITE_URL}${path}` })),
  };
}
