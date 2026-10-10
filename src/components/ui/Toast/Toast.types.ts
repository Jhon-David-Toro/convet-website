import type { ComponentPropsWithRef, ReactNode } from "react";

export type ToastTone = "success" | "error" | "info";

export type ToastProps = ComponentPropsWithRef<"div"> & {
  tone?: ToastTone;
  actionLabel?: string;
  onAction?: () => void;
};

export type ToastOptions = {
  message: string;
  tone?: ToastTone;
  action?: { label: string; onClick: () => void };
  duration?: number;
};

export type ToastItem = ToastOptions & {
  id: number;
};

export type ToastContextValue = {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
};

export type ToastProviderProps = {
  children: ReactNode;
};

export type ToastTimers = {
  schedule: (id: number, duration: number) => void;
  pause: (id: number) => void;
};

export type ToastRegionProps = ToastTimers & {
  items: ToastItem[];
  dismiss: (id: number) => void;
};

export type ToastRegionItemProps = ToastTimers & {
  item: ToastItem;
  dismiss: (id: number) => void;
};

export type ToastDurationParams = Pick<ToastOptions, "duration">;
