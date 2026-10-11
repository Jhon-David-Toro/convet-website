import { CUSTOMER_HOME_HREF, CUSTOMER_PETS_HREF } from "@/lib/customer.paths.constants";
import { findPet } from "@/lib/customer.utils";

import { FALLBACK_TITLE, TOP_BAR_TITLES } from "./CustomerShell.constants";
import type { TopBarConfig } from "./CustomerShell.types";

/**
 * Tells whether a navigation link belongs to the current page: the home link only on the home page, the others also on their sub-pages.
 *
 * @param href Link of the navigation item.
 * @param pathname Path of the current page.
 * @returns `true` when the item should be marked as current.
 */
export function isActivePath(href: string, pathname: string): boolean {
  if (href === CUSTOMER_HOME_HREF) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Title (and back link) of the top bar on small screens: a pet profile shows the pet name with a back arrow.
 *
 * @param pathname Path of the current page.
 * @returns What the top bar shows.
 */
export function topBarFor(pathname: string): TopBarConfig {
  const petId = pathname.startsWith(`${CUSTOMER_PETS_HREF}/`) ? pathname.split("/")[3] : undefined;
  const pet = petId ? findPet(petId) : undefined;
  if (pet) return { title: pet.name, backHref: CUSTOMER_PETS_HREF };
  return { title: TOP_BAR_TITLES[pathname] ?? FALLBACK_TITLE };
}
