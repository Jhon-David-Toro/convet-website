import type { FooterProps } from "@/components/ui/Footer";
import type { HeaderProps } from "@/components/ui/Header";

/** Content of the header of the home page. */
export type HomeHeaderContent = Pick<HeaderProps, "links" | "bookHref" | "signInHref" | "whatsappHref">;

/** Content of the footer of the home page. */
export type HomeFooterContent = Pick<FooterProps, "about" | "motto" | "columns" | "copyright" | "legalLinks">;
