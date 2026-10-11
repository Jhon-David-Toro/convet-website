import type { LucideIcon } from "lucide-react";

export type ServiceSpecies = "dogs" | "cats" | "birds";

export type ServiceBooking = "online" | "whatsapp";

export type ServiceStep = {
  title: string;
  detail: string;
};

export type ServiceFact = {
  icon: LucideIcon;
  title: string;
  detail: string;
};

export type ServiceVet = {
  name: string;
  photo: string;
};

export type ServiceTable = {
  title: string;
  columns: string[];
  rows: string[][];
};

export type ServiceItem = {
  slug: string;
  title: string;
  icon: LucideIcon;
  duration: string;
  species: ServiceSpecies[];
  speciesLabel: string;
  panelTitle: string;
  summary: string;
  cardSummary: string;
  highlights: string[];
  bookLabel: string;
  booking: ServiceBooking;
  lead: string;
  steps: ServiceStep[];
  facts: ServiceFact[];
  vets: ServiceVet[];
  table?: ServiceTable;
  related: string[];
  whatsappText: string;
};

export type ServiceFilter = {
  value: ServiceSpecies | "all";
  label: string;
};
