import type { LucideIcon } from "lucide-react";
import type Link from "next/link";
import type { ComponentProps, ComponentPropsWithRef } from "react";

import type { IconTone } from "@/components/ui/Icon";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "tertiary"
  | "destructive";

export type ButtonSize = "medium" | "small";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: LucideIcon;
  leadingIconTone?: IconTone;
  trailingIcon?: LucideIcon;
};

export type ButtonAsButtonProps = ButtonBaseProps &
  ComponentPropsWithRef<"button"> & {
    href?: undefined;
    loading?: boolean;
  };

export type ButtonAsLinkProps = ButtonBaseProps &
  ComponentProps<typeof Link> & {
    href: string;
    loading?: never;
    disabled?: never;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export type ButtonContentProps = Pick<
  ButtonAsButtonProps,
  "leadingIcon" | "leadingIconTone" | "trailingIcon" | "children" | "loading"
> & {
  size: ButtonSize;
};
