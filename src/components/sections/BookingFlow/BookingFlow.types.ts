import type { LucideIcon } from "lucide-react";

import type { BookingSlot, BookingVet } from "@/lib/booking.types";
import type { PetItem } from "@/lib/customer.types";

export type BookingStepId = "pet" | "service" | "vet" | "datetime" | "review" | "confirmed";

export type BookingSelection = {
  petId: string;
  serviceId: string;
  vetId: string;
  date: string;
  time: string;
  notes: string;
  whatsapp: boolean;
};

export type ConfirmResult = { ok: true } | { ok: false; alternatives: BookingSlot[] };

export type BookingFlowProps = {
  initialServiceId?: string;
  onConfirm?: (selection: BookingSelection) => Promise<ConfirmResult>;
};

export type UseBookingSelectionParams = {
  initialServiceId: string;
};

export type BookingSelectionState = {
  selection: BookingSelection;
  loading: boolean;
  setField: <Field extends keyof BookingSelection>(field: Field, value: BookingSelection[Field]) => void;
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

export type UseBookingFlowParams = Pick<BookingFlowProps, "initialServiceId" | "onConfirm">;

export type StepHeadingProps = {
  title: string;
  subtitle?: string;
};

export type StepProps = Pick<BookingFlowState, "selection" | "setField">;

export type StepServiceProps = StepProps & {
  pet: PetItem;
};

export type StepVetProps = Pick<BookingFlowState, "selection" | "chooseVet">;

export type StepDateTimeProps = Pick<BookingFlowState, "selection" | "loading" | "setField" | "chooseDate" | "goTo">;

export type StepReviewProps = Pick<BookingFlowState, "selection" | "setField" | "alternatives" | "pickAlternative">;

export type ReviewFormProps = StepReviewProps & {
  vet: BookingVet;
};

export type SlotTakenAlertProps = {
  time: string;
  alternatives: BookingSlot[];
  onPick: (time: string) => void;
};

export type BookingSideProps = Pick<BookingFlowState, "selection">;

export type BookingActionsProps = Pick<BookingFlowState, "step" | "canContinue" | "confirming" | "back" | "next" | "confirm">;

export type BookingBarProps = BookingActionsProps & Pick<BookingFlowState, "selection">;

export type StepConfirmedProps = Pick<BookingFlowState, "selection" | "restart">;

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

export type ConfirmedActionsProps = StepConfirmedProps;

export type WhatsAppBannerProps = Pick<BookingFlowState, "selection">;

export type StepContentProps = {
  flow: BookingFlowState;
};

export type PrimaryActionProps = Pick<BookingFlowState, "step" | "canContinue" | "confirming" | "next" | "confirm">;

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

export type FlowContentProps = StepContentProps;

export type ConfirmedHeaderProps = {
  date: string;
};
