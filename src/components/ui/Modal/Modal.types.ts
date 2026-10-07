import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

/** Modal icon tone: `error`, `warning`, `info`, `success`. */
export type ModalIconTone = "error" | "warning" | "info" | "success";

/** Props of the `ModalPanel` component. */
export type ModalPanelProps = Omit<ComponentPropsWithRef<"div">, "title"> & {
  /** Title text. */
  title: string;
  /** Description text under the title. */
  description?: string;
  /** Header icon (e.g. a warning in a destructive confirmation). */
  icon?: LucideIcon;
  /** Color tone of the icon. */
  iconTone?: ModalIconTone;
  /** Footer buttons, right-aligned. */
  actions?: ReactNode;
  /** Called when the user closes the dialog. */
  onClose?: () => void;
  /** Accessible name of the close button. */
  closeLabel?: string;
  /** Id of the title element, referenced by `aria-labelledby`. */
  titleId?: string;
  /** Id of the description element, referenced by `aria-describedby`. */
  descriptionId?: string;
};

/** Props of the `Modal` component. */
export type ModalProps = Omit<ModalPanelProps, "titleId" | "descriptionId" | "ref" | "className"> & {
  /** Whether the popup or menu is open. */
  open: boolean;
  /** Called on the close button, Escape or the backdrop. The consumer sets `open` to false. */
  onClose: () => void;
};

/** Props of the icon circle in the modal header. */
export type ModalIconProps = Pick<ModalPanelProps, "icon" | "iconTone">;

/** Props of the title / description block. */
export type ModalHeadingProps = Pick<ModalPanelProps, "title" | "description" | "titleId" | "descriptionId">;

/** Props of the panel header (icon, heading and close button). */
export type ModalHeaderProps = Pick<ModalPanelProps, "icon" | "iconTone" | "title" | "description" | "titleId" | "descriptionId" | "onClose" | "closeLabel">;

/** Inputs of the `useModalDialog` hook. */
export type UseModalDialogParams = Pick<ModalProps, "open" | "onClose">;
