import type { StatusView } from "@/components/patterns/StatusBadge";
import { Check, Lock } from "@/components/ui/Icon";
import type { SelectOption } from "@/components/ui/Select";

import type { ServiceTab } from "./AdminServices.types";

export const TITLE = "Services";

export const SUBTITLE = "What clients see on the website and can book online.";

export const NEW_LABEL = "New service";

export const TABLE_LABEL = "Services";

export const COLUMNS = ["Service", "Duration", "Online", "Vets"];

export const ONLINE_VIEWS: Record<"bookable" | "staff-only", StatusView> = {
  bookable: { tone: "success", icon: Check, label: "Bookable" },
  "staff-only": { tone: "neutral", icon: Lock, label: "Staff only" },
};

export const TABS: { value: ServiceTab; label: string }[] = [
  { value: "public", label: "Public page" },
  { value: "rules", label: "Booking rules" },
  { value: "vets", label: "Vets" },
];

export const TABS_LABEL = "Service sections";

export const PANEL_ID = "service-panel";

export const DURATION_OPTIONS: SelectOption[] = ["10", "15", "20", "30", "45", "60"].map((minutes) => ({ value: minutes, label: `${minutes} min` }));

export const BUFFER_OPTIONS: SelectOption[] = ["0", "5", "10", "15"].map((minutes) => ({ value: minutes, label: `${minutes} min` }));

export const SPECIES_OPTIONS = ["Dogs", "Cats", "Birds", "Exotics"];

export const DURATION_LABEL = "Duration";

export const BUFFER_LABEL = "Buffer after";

export const BOOKABLE_LABEL = "Bookable online";

export const BOOKABLE_DESCRIPTION = "Shown in the booking flow for the species below.";

export const SPECIES_LABEL = "Species";

export const PRICE_LABEL = "Price shown on website";

export const PRICE_HELPER = "Leave empty to show \"Price confirmed at the clinic\".";

export const DISCARD_LABEL = "Discard";

export const PUBLISH_LABEL = "Save & publish";

export const PUBLISHED_MESSAGE = "Service published.";

export const NAME_LABEL = "Service name";

export const DESCRIPTION_LABEL = "Description";

export const VET_NAMES = ["Dr. Shirley", "Dr. Larry", "Dr. Andreina", "Dr. Ricardo"];

export const VETS_LABEL = "Vets who provide this service";
