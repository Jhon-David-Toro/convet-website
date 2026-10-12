import type { StatusView } from "@/components/patterns/StatusBadge";
import { Check, Mail, User } from "@/components/ui/Icon";
import { CLIENT_FILTER_COUNTS } from "@/lib/admin/admin.constants";
import type { AccountKind } from "@/lib/admin/admin.types";

export const TITLE = "Clients & pets";

export const SUBTITLE = "1,284 clients · 1,902 pets";

export const NEW_LABEL = "New client";

export const FILTERS_LABEL = "Kind of account";

export const SEARCH_LABEL = "Name, phone, email or microchip";

export const SEARCH_SHORTCUT = "Ctrl K";

export const TABLE_LABEL = "Clients";

export const COLUMNS = ["Client", "Pets", "Phone", "Account", "Last visit"];

export const ALL_FILTER = "all";

export const FILTER_OPTIONS = [
  { value: "all", label: "All", count: CLIENT_FILTER_COUNTS.all },
  { value: "linked", label: "Online account", count: CLIENT_FILTER_COUNTS.linked },
  { value: "walk-in", label: "Walk-in only", count: CLIENT_FILTER_COUNTS["walk-in"] },
];

export const TOTAL = 1284;

export const PAGE_SIZE = 6;

export const PAGE_COUNT = 214;

export const ACCOUNT_VIEWS: Record<AccountKind, StatusView> = {
  linked: { tone: "success", icon: Check, label: "Linked" },
  "walk-in": { tone: "neutral", icon: User, label: "Walk-in" },
  "invite-pending": { tone: "warning", icon: Mail, label: "Invite pending" },
};
