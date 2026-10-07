import { X } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import styles from "../Modal.module.scss";
import type { ModalHeaderProps } from "../Modal.types";
import { ModalHeading } from "./ModalHeading";
import { ModalIcon } from "./ModalIcon";

/**
 * Panel header: optional icon, title with description, and the close button.
 *
 * @param props Props of the component, see {@link ModalHeaderProps}.
 * @param props.icon Header icon (e.g. a warning in a destructive confirmation).
 * @param props.iconTone Color tone of the icon.
 * @param props.title Title text.
 * @param props.description Description text under the title.
 * @param props.titleId Id of the title element, referenced by `aria-labelledby`.
 * @param props.descriptionId Id of the description element, referenced by `aria-describedby`.
 * @param props.onClose Called when the user closes the dialog.
 * @param props.closeLabel Accessible name of the close button.
 * @returns The rendered element.
 */
export function ModalHeader({ icon, iconTone, title, description, titleId, descriptionId, onClose, closeLabel = "Close" }: ModalHeaderProps) {
  return (
    <header className={styles.header}>
      <ModalIcon icon={icon} iconTone={iconTone} />
      <ModalHeading title={title} description={description} titleId={titleId} descriptionId={descriptionId} />
      <IconButton icon={X} label={closeLabel} onClick={onClose} />
    </header>
  );
}
