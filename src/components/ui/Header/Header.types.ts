import type { ComponentPropsWithRef } from "react";

import type { EmergencyBarProps } from "@/components/ui/EmergencyBar";

/** A navigation link of the header. */
export type HeaderLink = {
  /** Visible text of the link. */
  label: string;
  /** Link destination. */
  href: string;
  /** Whether the link points to the current page. */
  active?: boolean;
};

/** Props of the `Header` component. */
export type HeaderProps = Omit<ComponentPropsWithRef<"header">, "children"> & {
  /** Links to render. */
  links: HeaderLink[];
  /** Link of the logo; defaults to `/`. */
  homeHref?: string;
  /** Link to the booking page. */
  bookHref: string;
  /** Label of the booking button. */
  bookLabel?: string;
  /** Link to the sign in page. */
  signInHref: string;
  /** Label of the sign in link. */
  signInLabel?: string;
  /** Link that opens WhatsApp. */
  whatsappHref: string;
  /** Label of the WhatsApp link. */
  whatsappLabel?: string;
  /** Accessible name of the menu button. */
  menuLabel?: string;
  /** Emergency band text (defaults to the CONVET one). */
  emergency?: Omit<EmergencyBarProps, "ref">;
};

/** Props of the home link with the logo. */
export type HeaderLogoProps = Pick<HeaderProps, "homeHref">;

/** Props of the inline navigation links (desktop). */
export type HeaderLinksProps = Pick<HeaderProps, "links">;

/** Props of the action buttons of the navigation row. */
export type HeaderActionsProps = Pick<
  HeaderProps,
  "bookHref" | "bookLabel" | "signInHref" | "signInLabel" | "whatsappHref" | "whatsappLabel" | "menuLabel"
> & {
  /** Whether the dropdown menu is open. */
  open: boolean;
  /** Id of the dropdown menu, referenced by `aria-controls`. */
  menuId: string;
  /** Called to open or close the menu. */
  onToggleMenu: () => void;
};

/** Props of the dropdown menu (tablet and mobile). */
export type HeaderMenuProps = Pick<HeaderProps, "links" | "signInHref" | "signInLabel"> & {
  /** Element id. */
  id: string;
  /** Called when a link inside the menu is activated. */
  onNavigate: () => void;
};
