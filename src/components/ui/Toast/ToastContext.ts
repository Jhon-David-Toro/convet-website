"use client";

import { createContext, useContext } from "react";

import type { ToastContextValue } from "./Toast.types";

/** Context that exposes `toast` and `dismiss` to the descendants of a `ToastProvider`. */
export const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Shows and dismisses toasts. Must be used inside a `ToastProvider`.
 *
 * @returns The `toast` and `dismiss` functions.
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>");
  return context;
}
