import type { LucideIcon } from "lucide-react";

import type { BookingSlot, BookingVet } from "@/lib/booking/booking.types";
import type { PetItem } from "@/lib/customer/customer.types";
import type { SavePet } from "@/components/sections/MyPets/MyPets.types";

export type BookingStepId =
  | "pet"
  | "service"
  | "vet"
  | "datetime"
  | "review"
  | "confirmed";

export type BookingSelection = {
  petId: string;
  serviceId: string;
  vetId: string;
  date: string;
  time: string;
  notes: string;
  whatsapp: boolean;
};

export type ConfirmResult =
  | { ok: true }
  | { ok: false; alternatives: BookingSlot[] };

export type BookingFlowProps = {
  pets: PetItem[];
  initialServiceId?: string;
  onConfirm?: (selection: BookingSelection) => Promise<ConfirmResult>;
  onAddPet?: SavePet;
};

export type UseBookingSelectionParams = {
  initialPetId: string;
  initialServiceId: string;
};

export type BookingSelectionState = {
  selection: BookingSelection;
  loading: boolean;
  setField: <Field extends keyof BookingSelection>(
    field: Field,
    value: BookingSelection[Field],
  ) => void;
  chooseDate: (iso: string) => void;
  chooseVet: (vetId: string) => void;
  reset: () => void;
};

export type BookingFlowState = BookingSelectionState & {
  step: BookingStepId;
  alternatives: BookingSlot[] | null;
  confirming: boolean;
  canContinue: boolean;
  back: () => void;
  next: () => void;
  confirm: () => Promise<void>;
  restart: () => void;
  pickAlternative: (time: string) => void;
  goTo: (step: BookingStepId) => void;
};

export type UseBookingFlowParams = Pick<
  BookingFlowProps,
  "initialServiceId" | "onConfirm"
> & {
  initialPetId: string;
};

export type StepHeadingProps = {
  title: string;
  subtitle?: string;
};

export type StepProps = Pick<BookingFlowState, "selection" | "setField">;

export type StepPetProps = StepProps & {
  pets: PetItem[];
  onAddPet: () => void;
};

export type StepServiceProps = StepProps & {
  pet: PetItem;
};

export type StepVetProps = Pick<BookingFlowState, "selection" | "chooseVet">;

export type StepDateTimeProps = Pick<
  BookingFlowState,
  "selection" | "loading" | "setField" | "chooseDate" | "goTo"
>;

export type StepReviewProps = Pick<
  BookingFlowState,
  "selection" | "setField" | "alternatives" | "pickAlternative"
> & {
  pets: PetItem[];
};

export type ReviewFormProps = Pick<
  BookingFlowState,
  "selection" | "setField" | "alternatives" | "pickAlternative"
> & {
  vet: BookingVet;
};

export type SlotTakenAlertProps = {
  time: string;
  alternatives: BookingSlot[];
  onPick: (time: string) => void;
};

export type BookingSideProps = Pick<BookingFlowState, "selection"> & {
  pets: PetItem[];
};

export type BookingActionsProps = Pick<
  BookingFlowState,
  "step" | "canContinue" | "confirming" | "back" | "next" | "confirm"
>;

export type BookingBarProps = BookingActionsProps &
  Pick<BookingFlowState, "selection"> & {
    pets: PetItem[];
  };

export type StepConfirmedProps = {
  selection: BookingSelection;
  pets: PetItem[];
  restart: () => void;
};

export type OptionItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  meta?: string;
  disabled?: boolean;
};

export type OptionListProps = {
  name: string;
  label: string;
  options: OptionItem[];
  value: string;
  onChange: (id: string) => void;
};

export type NextAvailableButtonProps = {
  vetId: string;
  onPick: (iso: string, time: string) => void;
};

export type ConfirmedActionsProps = {
  selection: BookingSelection;
  pets: PetItem[];
  restart: () => void;
};

export type WhatsAppBannerProps = {
  selection: BookingSelection;
  pets: PetItem[];
};

export type StepContentProps = {
  flow: BookingFlowState;
  pets: PetItem[];
};

export type FlowContentProps = StepContentProps & {
  onAddPet: () => void;
};

export type PrimaryActionProps = Pick<
  BookingFlowState,
  "step" | "canContinue" | "confirming" | "next" | "confirm"
>;

export type StepsState = {
  step: BookingStepId;
  back: () => void;
  next: () => void;
  goTo: (step: BookingStepId) => void;
  toStart: () => void;
};

export type ReviewNoticeProps = {
  selection: BookingSelection;
  vet: BookingVet;
};

export type ReviewNotesProps = Pick<ReviewFormProps, "selection" | "setField">;

export type DeadlineNoteProps = Pick<ReviewFormProps, "selection">;

export type ConfirmedHeaderProps = {
  date: string;
};