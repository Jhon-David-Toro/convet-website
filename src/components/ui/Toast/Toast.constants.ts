import type { LucideIcon } from "lucide-react";

import { CheckCircle, Info, XCircle } from "@/components/ui/Icon";

import type { ToastTone } from "./Toast.types";

/** Default time in ms before a toast dismisses itself. */
export const TOAST_DEFAULT_DURATION_MS = 5000;

/** Leading icon for each toast tone. */
export const TOAST_ICONS: Record<ToastTone, LucideIcon> = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};
