import type { LucideIcon } from "lucide-react";
import type Link from "next/link";
import type { ComponentProps, ComponentPropsWithRef } from "react";

import type { IconTone } from "@/components/ui/Icon";

/** Button variant: `primary`, `accent`, `secondary`, `tertiary`, `destructive`. */
export type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "tertiary"
  | "destructive";

/** Button size: `medium`, `small`. */
export type ButtonSize = "medium" | "small";

/** Props of the `ButtonBase` component. */
type ButtonBaseProps = {
  /** Visual variant. */
  variant?: ButtonVariant;
  /** Size of the component. */
  size?: ButtonSize;
  /** Icon before the label. */
  leadingIcon?: LucideIcon;
  /** Leading icon color when it differs from the label (e.g. the WhatsApp green). */
  leadingIconTone?: IconTone;
  /** Icon after the label. */
  trailingIcon?: LucideIcon;
};

/** Props of the `ButtonAsButton` component. */
export type ButtonAsButtonProps = ButtonBaseProps &
  ComponentPropsWithRef<"button"> & {
    /** Link destination. */
    href?: undefined;
    /** Shows a spinner and marks the button as busy. It is disabled without changing its look. */
    loading?: boolean;
  };

/** Props of the `ButtonAsLink` component. */
export type ButtonAsLinkProps = ButtonBaseProps &
  ComponentProps<typeof Link> & {
    /** Link destination. */
    href: string;
    /** Loading. */
    loading?: never;
    /** Whether the control is disabled. */
    disabled?: never;
  };

/** Props of the `Button` component. */
export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

/** Props of the `ButtonContent` component. */
export type ButtonContentProps = Pick<
  ButtonAsButtonProps,
  "leadingIcon" | "leadingIconTone" | "trailingIcon" | "children" | "loading"
> & {
  /** Size of the button, which decides the icon size. */
  size: ButtonSize;
};
