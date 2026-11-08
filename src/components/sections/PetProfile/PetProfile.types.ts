import type { NewPetValues } from "@/components/sections/MyPets/MyPets.types";
import type { TimelineType } from "@/components/patterns/TimelineItem";
import type { ActionResult } from "@/lib/api/api.types";
import type { PET_TABS } from "@/lib/customer/customer.paths.constants";
import type { PetEvent, PetItem, PetVaccine, WeightPoint } from "@/lib/customer/customer.types";

export type PetTab = (typeof PET_TABS)[number];

/** Saves the edit form of a pet; in the app it is a Server Action that calls the backend. */
export type SavePetChanges = (idPet: string, values: NewPetValues) => Promise<ActionResult>;

/** Archives a pet after the customer confirmed it; in the app it is a Server Action that calls the backend. */
export type ArchivePet = (idPet: string) => Promise<ActionResult>;

/** Actions that change the pet, connected to the backend by the page. */
export type PetManageHandlers = {
  onSave: SavePetChanges;
  onArchive: ArchivePet;
};

/** History of the pet for the History tab: its events, or the reason they could not be loaded. */
export type PetHistory = {
  events: PetEvent[];
  error?: string;
};

export type PetProfileProps = PetManageHandlers & {
  pet: PetItem;
  tab: PetTab;
  history: PetHistory;
};

export type PetActionsProps = PetManageHandlers & {
  pet: PetItem;
};

export type EditPetModalProps = {
  idPet: string;
  name: string;
  initial: NewPetValues;
  onClose: () => void;
  onSave: SavePetChanges;
};

export type ArchivePetModalProps = {
  pet: PetItem;
  onClose: () => void;
  onArchive: ArchivePet;
};

export type AllergyNoteProps = {
  text: string;
};

export type PetProps = {
  pet: PetItem;
};

export type PetTabsProps = Omit<PetProfileProps, "history" | keyof PetManageHandlers> & {
  counts: Partial<Record<PetTab, number>>;
};

export type PetTabPanelProps = Omit<PetProfileProps, keyof PetManageHandlers>;

export type VaccineStampProps = {
  vaccine: PetVaccine;
};

export type VaccineStampsProps = {
  vaccines: PetVaccine[];
};

export type VaccinationCardProps = {
  vaccines: PetVaccine[];
};

export type NextStepCardProps = {
  pet: PetItem;
};

export type HistoryFilter = TimelineType | "all";

export type HistoryTabProps = PetProps & { history: PetHistory };

export type HistoryFiltersProps = {
  events: PetEvent[];
  filter: HistoryFilter;
  onChange: (filter: HistoryFilter) => void;
};

export type HistoryTimelineProps = {
  events: PetEvent[];
};

export type EventGroup = {
  year: string;
  events: PetEvent[];
};

export type WeightBar = {
  label: string;
  height: number;
  current: boolean;
};

export type WeightCardProps = {
  weights: WeightPoint[];
};

export type PetFactItem = {
  label: string;
  value: string;
  mono?: boolean;
};

export type WeightBarsProps = {
  weights: WeightPoint[];
};

export type VaccinationHeaderProps = {
  overdue: number;
};

export type VaccineListProps = {
  vaccines: PetVaccine[];
};
