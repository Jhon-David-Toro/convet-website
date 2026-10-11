import { Eye, Lock, Stethoscope } from "@/components/ui/Icon";

import type { StatusView } from "@/components/patterns/StatusBadge";

export const TITLE = "Products";

export const SUBTITLE = "Catalog shared by the website and inventory. No prices, no online sales.";

export const ADD_LABEL = "New product";

export const TABLE_LABEL = "Product catalog";

export const COLUMNS = ["Product", "SKU / UUID", "Category", "Type", "Prescription", "Website"];

export const PRESCRIPTION_VIEWS: Record<"rx" | "otc", StatusView> = {
  rx: { tone: "info", icon: Stethoscope, label: "Rx only" },
  otc: { tone: "neutral", label: "OTC" },
};

export const PUBLISHED_VIEWS: Record<"published" | "hidden", StatusView> = {
  published: { tone: "success", icon: Eye, label: "Published" },
  hidden: { tone: "neutral", icon: Lock, label: "Hidden" },
};
