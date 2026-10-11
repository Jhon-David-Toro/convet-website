import type { StatusView } from "@/components/patterns/StatusBadge";
import { AlertTriangle, Check, Clock, Lock, XCircle } from "@/components/ui/Icon";

import type { StockStatus } from "./admin.types";

export const STOCK_STATUS_VIEWS: Record<StockStatus, StatusView> = {
  "lot-expires": { tone: "warning", icon: Clock, label: "Lot expires in 60 d" },
  "in-stock": { tone: "success", icon: Check, label: "In stock" },
  "out-of-stock": { tone: "error", icon: XCircle, label: "Out of stock" },
  "low-stock": { tone: "warning", icon: AlertTriangle, label: "Low stock" },
  "expired-blocked": { tone: "error", icon: Lock, label: "Expired · blocked" },
  "expires-soon": { tone: "warning", icon: Clock, label: "Expires in 60 days" },
  available: { tone: "success", icon: Check, label: "Available" },
  "use-first": { tone: "warning", icon: Clock, label: "Use first · 60 days" },
};
