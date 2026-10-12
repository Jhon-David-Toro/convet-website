import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

export type ModalIconTone = "error" | "warning" | "info" | "success";

export type ModalPanelProps = Omit<ComponentPropsWithRef<"div">, "title"> & {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconTone?: ModalIconTone;
  actions?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  titleId?: string;
  descriptionId?: string;
};

export type ModalPlacement = "center" | "end";

export type ModalProps = Omit<ModalPanelProps, "titleId" | "descriptionId" | "ref" | "className"> & {
  open: boolean;
  placement?: ModalPlacement;
  onClose: () => void;
};

export type ModalIconProps = Pick<ModalPanelProps, "icon" | "iconTone">;

export type ModalHeadingProps = Pick<ModalPanelProps, "title" | "description" | "titleId" | "descriptionId">;

export type ModalHeaderProps = Pick<ModalPanelProps, "icon" | "iconTone" | "title" | "description" | "titleId" | "descriptionId" | "onClose" | "closeLabel">;

export type UseModalDialogParams = Pick<ModalProps, "open" | "onClose">;
