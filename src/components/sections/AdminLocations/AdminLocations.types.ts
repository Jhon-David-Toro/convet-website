import type { ServerAction } from "@/lib/shared/useActionToast.types";
import type { ClosureEntry, LocationInfo } from "@/lib/admin/admin.types";

export type LocationCardProps = {
  location: LocationInfo;
  actions?: LocationActions;
};

export type LocationHeaderProps = LocationCardProps;

export type PhoneFieldsProps = LocationCardProps;

export type HoursListProps = {
  hours: LocationInfo["hours"];
};

export type HoursCardProps = {
  location: LocationInfo;
};

export type ClosureListProps = {
  closures: ClosureEntry[];
  onRemove: (id: string) => void;
};

export type ClosureItemProps = {
  closure: ClosureEntry;
  onRemove: (id: string) => void;
};

export type ClosuresState = {
  closures: ClosureEntry[];
  remove: (id: string) => void;
  add: (closure: ClosureEntry) => void;
};

export type LocationActions = {
  setActive?: ServerAction<[idBranch: string, isActive: boolean], void>;
  savePhone?: ServerAction<[idBranch: string, phone: string], void>;
};

export type AdminLocationsProps = {
  locations: LocationInfo[];
  loadError?: string;
  actions?: LocationActions;
};

export type LocationActionsProps = {
  actions?: LocationActions;
};
