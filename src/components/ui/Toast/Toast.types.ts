import type { ComponentPropsWithRef, ReactNode } from "react";

/** Toast tone: `success`, `error`, `info`. */
export type ToastTone = "success" | "error" | "info";

/** Props of the `Toast` component. */
export type ToastProps = ComponentPropsWithRef<"div"> & {
  /** Color tone. */
  tone?: ToastTone;
  /** Label of the action button. */
  actionLabel?: string;
  /** Called when the action is activated. */
  onAction?: () => void;
};

/** Options to show a toast. */
export type ToastOptions = {
  /** Message to show. */
  message: string;
  /** Color tone. */
  tone?: ToastTone;
  /** Action shown with the message: a link (`href`) or a button (`onClick`). */
  action?: { label: string; onClick: () => void };
  /** Milliseconds before it dismisses itself (defaults to 5000). Paused while the pointer or focus is over it. */
  duration?: number;
};

/** A toast on screen: its options plus the id the queue gave it. */
export type ToastItem = ToastOptions & {
  /** Id the queue gave the toast. */
  id: number;
};

/** What `useToast` returns: how to show and dismiss toasts. */
export type ToastContextValue = {
  /** Shows a toast and returns its id. */
  toast: (options: ToastOptions) => number;
  /** Dismisses a toast by id. */
  dismiss: (id: number) => void;
};

/** Props of the provider that renders and manages the toast stack. */
export type ToastProviderProps = {
  /** Content of the element. */
  children: ReactNode;
};

/** Inputs of the `useToastTimers` hook. */
export type ToastTimers = {
  /** Starts (or restarts) the countdown that dismisses a toast. */
  schedule: (id: number, duration: number) => void;
  /** Stops the countdown of a toast, e.g. while the pointer is over it. */
  pause: (id: number) => void;
};

/** Props of the notification region. */
export type ToastRegionProps = ToastTimers & {
  /** Items to render. */
  items: ToastItem[];
  /** Dismisses a toast by id. */
  dismiss: (id: number) => void;
};

/** Props of one toast inside the region. */
export type ToastRegionItemProps = ToastTimers & {
  /** Item to render. */
  item: ToastItem;
  /** Dismisses a toast by id. */
  dismiss: (id: number) => void;
};

/** What decides how long a toast stays. */
export type ToastDurationParams = Pick<ToastOptions, "duration">;
