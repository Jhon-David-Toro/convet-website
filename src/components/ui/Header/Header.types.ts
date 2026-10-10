import type { ComponentPropsWithRef } from "react";

import type { EmergencyBarProps } from "@/components/ui/EmergencyBar";

export type HeaderLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type HeaderProps = Omit<ComponentPropsWithRef<"header">, "children"> & {
  links: HeaderLink[];
  homeHref?: string;
  bookHref: string;
  bookLabel?: string;
  signInHref: string;
  signInLabel?: string;
  whatsappHref: string;
  whatsappLabel?: string;
  menuLabel?: string;
  emergency?: Omit<EmergencyBarProps, "ref">;
};

export type HeaderLogoProps = Pick<HeaderProps, "homeHref">;

export type HeaderLinksProps = Pick<HeaderProps, "links">;

export type HeaderActionsProps = Pick<
  HeaderProps,
  "bookHref" | "bookLabel" | "signInHref" | "signInLabel" | "whatsappHref" | "whatsappLabel" | "menuLabel"
> & {
  open: boolean;
  menuId: string;
  onToggleMenu: () => void;
};

export type HeaderMenuProps = Pick<HeaderProps, "links" | "signInHref" | "signInLabel"> & {
  id: string;
  onNavigate: () => void;
};
