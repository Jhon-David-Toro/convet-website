import type { ComponentPropsWithRef } from "react";

export type AlertTone = "info" | "success" | "warning" | "error";

type AlertAction = {
  label: string;
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never });

export type AlertProps = Omit<ComponentPropsWithRef<"div">, "title"> & {
  tone?: AlertTone;
  title: string;
  action?: AlertAction;
  onDismiss?: () => void;
  dismissLabel?: string;
};

export type AlertContentProps = Pick<AlertProps, "title" | "action" | "children">;

export type AlertActionProps = {
  action: NonNullable<AlertProps["action"]>;
};

export type AlertDismissProps = {
  label: string;
  onDismiss: () => void;
};
