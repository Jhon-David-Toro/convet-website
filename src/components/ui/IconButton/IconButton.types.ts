import type { LucideIcon } from "lucide-react";
import type Link from "next/link";
import type { ComponentProps, ComponentPropsWithRef } from "react";

export type IconButtonVariant = "ghost" | "outline" | "brand";

type IconButtonBaseProps = {
  icon: LucideIcon;
  label: string;
  variant?: IconButtonVariant;
};

export type IconButtonAsButtonProps = IconButtonBaseProps &
  Omit<ComponentPropsWithRef<"button">, "children" | "aria-label"> & {
    href?: undefined;
  };

export type IconButtonAsLinkProps = IconButtonBaseProps &
  Omit<ComponentProps<typeof Link>, "children" | "aria-label"> & {
    href: string;
    disabled?: never;
  };

export type IconButtonProps = IconButtonAsButtonProps | IconButtonAsLinkProps;
