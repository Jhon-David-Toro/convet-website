import { cx } from "@/lib/shared/cx";

import styles from "./Modal.module.scss";
import type { ModalPanelProps } from "./Modal.types";
import { ModalHeader } from "./parts/ModalHeader";

/**
 * Modal: header, body and footer on an elevated surface. Used inside `Modal` or on its own (documentation).
 *
 * @param props Props of the component, see {@link ModalPanelProps}.
 * @param props.title Title text.
 * @param props.description Description text under the title.
 * @param props.icon Header icon (e.g. a warning in a destructive confirmation).
 * @param props.iconTone Color tone of the icon.
 * @param props.actions Footer buttons, right-aligned.
 * @param props.onClose Called when the user closes the dialog.
 * @param props.closeLabel Accessible name of the close button.
 * @param props.titleId Id of the title element, referenced by `aria-labelledby`.
 * @param props.descriptionId Id of the description element, referenced by `aria-describedby`.
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function ModalPanel({ title, description, icon, iconTone, actions, onClose, closeLabel, titleId, descriptionId, className, children, ...rest }: ModalPanelProps) {
  return (
    <div {...rest} className={cx(styles.panel, className)}>
      <ModalHeader
        icon={icon}
        iconTone={iconTone}
        title={title}
        description={description}
        titleId={titleId}
        descriptionId={descriptionId}
        onClose={onClose}
        closeLabel={closeLabel}
      />
      {children && <div className={styles.body}>{children}</div>}
      {actions && <footer className={styles.footer}>{actions}</footer>}
    </div>
  );
}
