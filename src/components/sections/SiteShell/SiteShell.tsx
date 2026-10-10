import { MobileQuickActions } from "@/components/sections/MobileQuickActions";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";

import { SITE_FOOTER, SITE_HEADER } from "./SiteShell.constants";
import type { SiteShellProps } from "./SiteShell.types";
import { markActiveLink } from "./SiteShell.utils";

/**
 * Frame shared by every page: header, `<main>`, footer and the fixed bar of the mobile site.
 *
 * @param props Props of the component, see {@link SiteShellProps}.
 * @param props.current Path of the section the page belongs to; its header link is marked as active.
 * @param props.mobileBar Replaces the default mobile bar (book, chat, SOS).
 * @param props.children Content of the page.
 * @returns The rendered element.
 */
export function SiteShell({ current, mobileBar = <MobileQuickActions />, children }: SiteShellProps) {
  return (
    <>
      <Header {...SITE_HEADER} links={markActiveLink({ links: SITE_HEADER.links, current })} />
      <main>{children}</main>
      <Footer {...SITE_FOOTER} />
      {mobileBar}
    </>
  );
}
