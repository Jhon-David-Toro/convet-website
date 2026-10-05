import type { LucideIcon } from "lucide-react";

import { AlertTriangle, CheckCircle, Info, XCircle } from "@/components/ui/Icon";

import type { AlertTone } from "./Alert.types";

/** Size in px of the dismiss (X) icon. */
export const ALERT_DISMISS_ICON_SIZE = 18;

/** Leading icon for each alert tone. */
export const ALERT_ICONS: Record<AlertTone, LucideIcon> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

/** Tones that interrupt screen readers (role "alert"); the others are announced politely (role "status"). */
export const INTERRUPTING_TONES: readonly AlertTone[] = ["error", "warning"];
