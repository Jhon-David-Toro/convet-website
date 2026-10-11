import { ArrowLeft, Menu } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import { BACK_LABEL, MENU_LABEL } from "../StaffShell.constants";
import type { LeadingButtonProps } from "../StaffShell.types";

/**
 * Button at the start of the compact top bar: a back arrow on record pages, the menu button on the others.
 *
 * @param props Props of the component, see {@link LeadingButtonProps}.
 * @param props.backHref Where the back arrow goes; without it the menu button is shown.
 * @param props.onMenu Opens the menu.
 * @returns The rendered element.
 */
export function LeadingButton({ backHref, onMenu }: LeadingButtonProps) {
  if (backHref) return <IconButton variant="ghost" icon={ArrowLeft} label={BACK_LABEL} href={backHref} />;
  return <IconButton variant="ghost" icon={Menu} label={MENU_LABEL} onClick={onMenu} />;
}
