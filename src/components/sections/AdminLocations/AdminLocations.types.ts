import type { ClosureEntry, LocationInfo } from "@/lib/admin.types";

export type LocationCardProps = {
  location: LocationInfo;
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
  add: () => void;
};
