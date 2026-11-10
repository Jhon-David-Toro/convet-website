import { MobileQuickActions } from "@/components/sections/MobileQuickActions";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { verifySession } from "@/lib/auth/auth.dal";
import type { AuthUser } from "@/lib/auth/auth.dal";

import { ROLE_HOME, SITE_FOOTER, SITE_HEADER } from "./SiteShell.constants";
import type { SiteShellProps } from "./SiteShell.types";
import { markActiveLink } from "./SiteShell.utils";

/**
 * Frame shared by every page: header, `<main>`, footer and the fixed bar of the mobile site.
 * Signed-in visitors get "My account" instead of "Sign in", linking to their area.
 *
 * @param props Props of the component, see {@link SiteShellProps}.
 * @param props.current Path of the section the page belongs to; its header link is marked as active.
 * @param props.mobileBar Replaces the default mobile bar (book, chat, SOS).
 * @param props.children Content of the page.
 * @returns The rendered element.
 */
export async function SiteShell({ current, mobileBar = <MobileQuickActions />, children }: SiteShellProps) {
  const user = await verifySession();
  const header = user ? accountHeader(user) : SITE_HEADER;

  return (
    <>
      <Header {...header} links={markActiveLink({ links: header.links, current })} />
      <main>{children}</main>
      <Footer {...SITE_FOOTER} />
      {mobileBar}
    </>
  );
}

/**
 * Swaps the "Sign in" action for "My account", pointing to the signed-in user's own area.
 *
 * @param user Signed-in user.
 * @returns The header content for a signed-in visitor.
 */
function accountHeader(user: AuthUser): typeof SITE_HEADER {
  return { ...SITE_HEADER, signInHref: ROLE_HOME[user.role], signInLabel: "My account" };
}
