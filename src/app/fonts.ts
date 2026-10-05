import { IBM_Plex_Mono, Kaushan_Script, Montserrat, Oswald } from "next/font/google";

/** Oswald font (display headings), exposed as `--font-oswald`. */
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

/** Montserrat font (body text and labels), exposed as `--font-montserrat`. */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

/** IBM Plex Mono font (data such as lots and microchips), exposed as `--font-ibm-plex-mono`. */
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

/** Kaushan Script font (brush accent), exposed as `--font-kaushan-script`. */
const kaushanScript = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kaushan-script",
  display: "swap",
});

/** Class names that expose every font as a CSS variable, to put on `<html>`. */
export const fontVariables = [oswald, montserrat, ibmPlexMono, kaushanScript].map((font) => font.variable).join(" ");
