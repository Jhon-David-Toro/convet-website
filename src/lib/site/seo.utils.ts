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
