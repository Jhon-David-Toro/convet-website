import type { SelectOption } from "@/components/ui/Select";

import type { ServiceValues } from "./ServiceModal.types";

export const MODAL_TITLE = "New service";

export const MODAL_DESCRIPTION = "Duration is set in 10-minute blocks; it decides how many slots a booking uses.";

export const MODAL_WIDTH = "40rem";

export const EMPTY_SERVICE: ServiceValues = { name: "", category: "", duration: "30", buffer: "10", vets: [], online: true };

export const SUBMIT_LABEL = "Create service";

export const SAVED_MESSAGE = "Service created.";

export const NAME_ERROR = "Enter the service name.";

export const CATEGORY_ERROR = "Choose a category.";

export const VETS_ERROR = "Choose at least one vet.";

export const DURATION_HELPER = "Multiples of 10 min only";

export const CATEGORY_OPTIONS: SelectOption[] = [
  { value: "", label: "Choose a category" },
  { value: "preventive", label: "Preventive care" },
  { value: "consultation", label: "Consultations" },
  { value: "treatment", label: "Treatments" },
  { value: "surgery", label: "Surgery" },
];

export const DURATION_OPTIONS: SelectOption[] = [10, 20, 30, 40, 50, 60].map((minutes) => ({
  value: String(minutes),
  label: `${minutes} min · ${minutes / 10} ${minutes === 10 ? "slot" : "slots"}`,
}));

export const BUFFER_OPTIONS: SelectOption[] = [0, 10, 20].map((minutes) => ({ value: String(minutes), label: minutes === 0 ? "No buffer" : `${minutes} min` }));

export const VET_NAMES = ["Dr. Shirley", "Dr. Larry", "Dr. Andreina", "Dr. Ricardo", "Dr. Susana"];

export const VETS_LABEL = "Vets who offer it";

export const ONLINE_LABEL = "Bookable online";

export const ONLINE_DESCRIPTION = "Clients can request it from the website";
