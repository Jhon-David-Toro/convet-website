import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export type NotificationTone = "info" | "success" | "warning" | "error";

export type NotificationItemProps = Omit<ComponentPropsWithRef<"li">, "title" | "onClick"> & {
  icon: LucideIcon;
  tone?: NotificationTone;
  title: string;
  text: string;
  when: string;
  linkLabel?: string;
  href?: string;
  unread?: boolean;
  onOpen?: () => void;
  onMarkRead?: () => void;
};
