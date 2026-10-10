import type { ReactNode } from "react";

import type { FooterProps } from "@/components/ui/Footer";
import type { HeaderLink, HeaderProps } from "@/components/ui/Header";

export type SiteHeaderContent = Pick<HeaderProps, "links" | "bookHref" | "signInHref" | "whatsappHref">;

export type SiteFooterContent = Pick<FooterProps, "about" | "motto" | "columns" | "copyright" | "legalLinks">;

export type SiteShellProps = {
  current: string;
  mobileBar?: ReactNode;
  children: ReactNode;
};

export type MarkActiveLinkParams = {
  links: HeaderLink[];
  current: string;
};
