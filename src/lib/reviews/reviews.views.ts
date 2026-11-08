import type { StatusView } from "@/components/patterns/StatusBadge";
import { Check, Clock, Minus } from "@/components/ui/Icon";
import type { ReviewStatus } from "@/lib/api/reviews.contract";

import { REVIEW_STATUS_LABELS } from "./reviews.constants";

/** Badge of each moderation state: a waiting review, a published one and a hidden one. */
export const REVIEW_STATUS_VIEWS: Record<ReviewStatus, StatusView> = {
  PENDING: { tone: "warning", icon: Clock, label: REVIEW_STATUS_LABELS.PENDING },
  APPROVED: { tone: "success", icon: Check, label: REVIEW_STATUS_LABELS.APPROVED },
  HIDDEN: { tone: "neutral", icon: Minus, label: REVIEW_STATUS_LABELS.HIDDEN },
};
