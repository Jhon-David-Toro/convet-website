import type { LucideIcon } from "lucide-react";
import type Link from "next/link";
import type { ComponentProps, ComponentPropsWithRef } from "react";

/** Icon button variant: `ghost`, `outline`, `brand`. */
export type IconButtonVariant = "ghost" | "outline" | "brand";

/** Props of the `IconButtonBase` component. */
type IconButtonBaseProps = {
  /** Icon component to draw. */
  icon: LucideIcon;
  /** Accessible name of the button. */
  label: string;
  /** Visual variant. */
  variant?: IconButtonVariant;
};

/** Props of the `IconButtonAsButton` component. */
export type IconButtonAsButtonProps = IconButtonBaseProps &
  Omit<ComponentPropsWithRef<"button">, "children" | "aria-label"> & {
    /** Link destination. */
    href?: undefined;
  };

/** Props of the `IconButtonAsLink` component. */
export type IconButtonAsLinkProps = IconButtonBaseProps &
  Omit<ComponentProps<typeof Link>, "children" | "aria-label"> & {
    /** Link destination. */
    href: string;
    /** Whether the control is disabled. */
    disabled?: never;
  };

/** Props of the `IconButton` component. */
export type IconButtonProps = IconButtonAsButtonProps | IconButtonAsLinkProps;
