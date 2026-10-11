import type { Metadata } from "next";

import { photoUrl } from "@/lib/photos";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo.constants";
import { shareImageUrl } from "@/lib/seo.utils";
import "@/styles/globals.scss";

import { fontVariables } from "./fonts";
import { FAVICON_TRANSFORM } from "./layout.constants";
import type { RootLayoutProps } from "./layout.types";

/** Default page metadata: title, description, round logo as favicon, and the cards shown when the site is shared. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: { icon: photoUrl("logo-mark", FAVICON_TRANSFORM) },
  openGraph: { type: "website", siteName: SITE_NAME, title: SITE_TITLE, description: SITE_DESCRIPTION, locale: "en_AW", images: [shareImageUrl()] },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION, images: [shareImageUrl()] },
};

/**
 * Root layout of the application: sets the language and exposes the fonts as CSS variables.
 *
 * @param props Props of the component, see {@link RootLayoutProps}.
 * @param props.children Content of the element.
 * @returns The rendered element.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={fontVariables} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}