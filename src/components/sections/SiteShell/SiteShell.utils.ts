import type { HeaderLink } from "@/components/ui/Header";

import { HOME_PATH } from "./SiteShell.constants";
import type { MarkActiveLinkParams } from "./SiteShell.types";

/**
 * Tells whether a header link belongs to the section of the current page.
 *
 * @param href Path of the header link.
 * @param current Path of the section the page belongs to.
 * @returns `true` for the home link only on the home page, and for any other link when the page lives under it.
 */
function isActive(href: string, current: string): boolean {
  if (href === HOME_PATH) return current === HOME_PATH;
  return current === href || current.startsWith(`${href}/`);
}

/**
 * Marks the header link of the current section as active.
 *
 * @param params Parameters of the marker, see {@link MarkActiveLinkParams}.
 * @param params.links Links of the header.
 * @param params.current Path of the section the page belongs to.
 * @returns A copy of the links where only the current section is active.
 */
export function markActiveLink({ links, current }: MarkActiveLinkParams): HeaderLink[] {
  return links.map((link) => ({ ...link, active: isActive(link.href, current) }));
}
