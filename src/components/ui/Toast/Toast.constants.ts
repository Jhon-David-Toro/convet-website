import type { LucideIcon } from "lucide-react";

import { CheckCircle, Info, XCircle } from "@/components/ui/Icon";

import type { ToastTone } from "./Toast.types";

export const TOAST_DEFAULT_DURATION_MS = 5000;

export const TOAST_DISMISS_LABEL = "Dismiss notification";

export const MOUSE_POINTER = "mouse";

export const TOAST_ICONS: Record<ToastTone, LucideIcon> = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};
