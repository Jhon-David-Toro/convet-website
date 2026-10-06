"use client";

import { EmergencyBar } from "@/components/ui/EmergencyBar";
import { cx } from "@/lib/cx";

import styles from "./Header.module.scss";
import type { HeaderProps } from "./Header.types";
import { useHeaderMenu } from "./hooks/useHeaderMenu";
import { HeaderActions } from "./parts/HeaderActions";
import { HeaderLinks } from "./parts/HeaderLinks";
import { HeaderLogo } from "./parts/HeaderLogo";
import { HeaderMenu } from "./parts/HeaderMenu";

/**
 * Navigation/Header: emergency band + navigation row. Desktop: inline links and actions;
 * tablet: WhatsApp (icon), "Book a visit" and menu; mobile: WhatsApp (icon) and menu (booking lives in the action bar).
 * Client Component because of the dropdown menu.
 *
 * @param props Props of the component, see {@link HeaderProps}.
 * @param props.links Links to render.
 * @param props.homeHref Link of the logo; defaults to `/`.
 * @param props.bookHref Link to the booking page.
 * @param props.bookLabel Label of the booking button.
 * @param props.signInHref Link to the sign in page.
 * @param props.signInLabel Label of the sign in link.
 * @param props.whatsappHref Link that opens WhatsApp.
 * @param props.whatsappLabel Label of the WhatsApp link.
 * @param props.menuLabel Accessible name of the menu button.
 * @param props.emergency Emergency band text (defaults to the CONVET one).
 * @param props.className Extra class name for the root element.
 * @param props.header Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Header({
  links,
  homeHref,
  bookHref,
  bookLabel,
  signInHref,
  signInLabel,
  whatsappHref,
  whatsappLabel,
  menuLabel,
  emergency,
  className,
  ...header
}: HeaderProps) {
  const { open, rootRef, menuId, close, toggle, handleKeyDown } = useHeaderMenu();

  return (
    <header {...header} ref={rootRef} className={cx(styles.header, className)} onKeyDown={handleKeyDown}>
      <EmergencyBar {...emergency} />
      <div className={styles.row}>
        <HeaderLogo homeHref={homeHref} />
        <HeaderLinks links={links} />
        <HeaderActions
          {...{ bookHref, bookLabel, signInHref, signInLabel, whatsappHref, whatsappLabel, menuLabel }}
          open={open}
          menuId={menuId}
          onToggleMenu={toggle}
        />
      </div>
      {open && <HeaderMenu id={menuId} links={links} signInHref={signInHref} signInLabel={signInLabel} onNavigate={close} />}
    </header>
  );
}
