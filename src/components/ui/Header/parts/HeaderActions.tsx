import { Button } from "@/components/ui/Button";
import { Menu, User, WhatsApp, X } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import styles from "../Header.module.scss";
import type { HeaderActionsProps } from "../Header.types";

/**
 * Sign in, WhatsApp, booking and menu buttons; each breakpoint shows only its own subset.
 *
 * @param props Props of the component, see {@link HeaderActionsProps}.
 * @param props.bookHref Link to the booking page.
 * @param props.bookLabel Label of the booking button.
 * @param props.signInHref Link to the sign in page.
 * @param props.signInLabel Label of the sign in link.
 * @param props.whatsappHref Link that opens WhatsApp.
 * @param props.whatsappLabel Label of the WhatsApp link.
 * @param props.menuLabel Accessible name of the menu button.
 * @param props.open Whether the dropdown menu is open.
 * @param props.menuId Id of the dropdown menu, referenced by `aria-controls`.
 * @param props.onToggleMenu Called to open or close the menu.
 * @returns The rendered element.
 */
export function HeaderActions({
  bookHref,
  bookLabel = "Book a visit",
  signInHref,
  signInLabel = "Sign in",
  whatsappHref,
  whatsappLabel = "WhatsApp",
  menuLabel = "Menu",
  open,
  menuId,
  onToggleMenu,
}: HeaderActionsProps) {
  return (
    <div className={styles.actions}>
      <Button href={signInHref} variant="tertiary" leadingIcon={User} className={styles.signIn}>
        {signInLabel}
      </Button>
      <Button href={whatsappHref} variant="secondary" leadingIcon={WhatsApp} className={styles.whatsappDesktop}>
        {whatsappLabel}
      </Button>
      <IconButton href={whatsappHref} icon={WhatsApp} label={whatsappLabel} variant="outline" className={styles.whatsappIcon} />
      <Button href={bookHref} variant="accent" className={styles.bookDesktop}>
        {bookLabel}
      </Button>
      <Button href={bookHref} variant="accent" size="small" className={styles.bookTablet}>
        {bookLabel}
      </Button>
      <IconButton
        icon={open ? X : Menu}
        label={menuLabel}
        variant="outline"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={onToggleMenu}
      />
    </div>
  );
}
