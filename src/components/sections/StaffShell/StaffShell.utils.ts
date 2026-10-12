import { FALLBACK_TITLE } from "./StaffShell.constants";
import type { ShellConfig, StaffNavGroup, StaffTopBarConfig } from "./StaffShell.types";

/**
 * Tells whether a navigation link belongs to the current page: the home link only on the home page, the others also on their sub-pages.
 *
 * @param base Base path of the navigation item.
 * @param pathname Path of the current page.
 * @param homeHref Path of the home page of the area.
 * @returns `true` when the item should be marked as current.
 */
export function isActivePath(base: string, pathname: string, homeHref: string): boolean {
  if (base === homeHref) return pathname === base;
  return pathname === base || pathname.startsWith(`${base}/`);
}

/**
 * Title (and back link) of the top bar on small screens: the entry of the area made for exactly this page, or else the most specific one that matches it.
 *
 * @param pathname Path of the current page.
 * @param config Configuration of the area.
 * @returns What the top bar shows.
 */
export function topBarFor(pathname: string, config: ShellConfig): StaffTopBarConfig {
  const exact = config.exactTitles?.[pathname];
  if (exact) return exact;
  const matches = Object.keys(config.titles).filter((key) => key === pathname || (key !== config.homeHref && pathname.startsWith(`${key}/`)));
  const best = matches.sort((a, b) => b.length - a.length)[0];
  return best ? config.titles[best] : { title: FALLBACK_TITLE };
}

/**
 * Groups of the sidebar with the item of the current page marked.
 *
 * @param groups Navigation groups of the area.
 * @param pathname Path of the current page.
 * @param homeHref Path of the home page of the area.
 * @returns The groups in the shape the sidebar expects.
 */
export function sidebarGroups(groups: StaffNavGroup[], pathname: string, homeHref: string) {
  return groups.map(({ heading, items }) => ({
    heading,
    items: items.map(({ icon, label, href, base, count }) => ({ icon, label, href, count, active: isActivePath(base, pathname, homeHref) })),
  }));
}
