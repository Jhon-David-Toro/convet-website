import type { LucideIcon } from "lucide-react";

import { AlertTriangle, CheckCircle, Info, XCircle } from "@/components/ui/Icon";

import type { AlertTone } from "./Alert.types";

export const ALERT_DISMISS_ICON_SIZE = 18;

export const ALERT_ICONS: Record<AlertTone, LucideIcon> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

export const INTERRUPTING_TONES: readonly AlertTone[] = ["error", "warning"];
