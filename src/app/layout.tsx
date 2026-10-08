import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Kaushan_Script,
  Montserrat,
  Oswald,
} from "next/font/google";

import "@/styles/globals.scss";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const kaushanScript = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kaushan-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Convetura",
  description: "Always animals first",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const fontVariables = [
    oswald.variable,
    montserrat.variable,
    ibmPlexMono.variable,
    kaushanScript.variable,
  ].join(" ");

  return (
    <html lang="es" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}