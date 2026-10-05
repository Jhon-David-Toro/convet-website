import type { Metadata } from "next";

import "@/styles/globals.scss";

import { fontVariables } from "./fonts";
import type { RootLayoutProps } from "./layout.types";

/** Default page metadata: title and description. */
export const metadata: Metadata = {
  title: "CONVET",
  description: "Always animals first",
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
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}