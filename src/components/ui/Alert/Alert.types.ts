import type { ComponentPropsWithRef } from "react";

/** Alert tone: `info`, `success`, `warning`, `error`. */
export type AlertTone = "info" | "success" | "warning" | "error";

/** Action of an alert: a link (`href`) or a button (`onClick`), never both. */
type AlertAction = {
  /** Text of the link or button. */
  label: string;
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never });

/** Props of the `Alert` component. */
export type AlertProps = Omit<ComponentPropsWithRef<"div">, "title"> & {
  /** Color tone. */
  tone?: AlertTone;
  /** Title text. */
  title: string;
  /** Highlighted action below the message: a link (`href`) or a button (`onClick`). */
  action?: AlertAction;
  /** When given, shows the dismiss button and calls this on click. */
  onDismiss?: () => void;
  /** Accessible name of the dismiss button. */
  dismissLabel?: string;
};

/** Props of the text block (title, message and action). */
export type AlertContentProps = Pick<AlertProps, "title" | "action" | "children">;

/** Props of the action link or button. */
export type AlertActionProps = {
  /** Action shown with the message: a link (`href`) or a button (`onClick`). */
  action: NonNullable<AlertProps["action"]>;
};

/** Props of the dismiss button. */
export type AlertDismissProps = {
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
  /** Called when the user dismisses the element; when given, the dismiss button is shown. */
  onDismiss: () => void;
};
