"use client";

import type { ToastProviderProps } from "./Toast.types";
import { ToastContext } from "./ToastContext";
import { useToastQueue } from "./hooks/useToastQueue";
import { ToastRegion } from "./parts/ToastRegion";

/**
 * Notification region: toasts stack at the bottom and are announced with aria-live="polite".
 * They dismiss themselves, but not while the pointer or focus is over them (WCAG 2.2.1).
 *
 * @param props Props of the component, see {@link ToastProviderProps}.
 * @param props.children Content of the element.
 * @returns The rendered element.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const { items, api, ...controls } = useToastQueue();

  return (
    <ToastContext value={api}>
      {children}
      <ToastRegion items={items} {...controls} />
    </ToastContext>
  );
}
