import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

export type AuthLayoutProps = {
  backHref: string;
  children: ReactNode;
};

export type AuthMobileTopProps = Pick<AuthLayoutProps, "backHref">;

export type AuthHeadingProps = {
  title: string;
  subtitle?: ReactNode;
  loose?: boolean;
};

export type AuthIconProps = {
  icon: LucideIcon;
};

export type AuthFormProps = ComponentPropsWithRef<"form">;
