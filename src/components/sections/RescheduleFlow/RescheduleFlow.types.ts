import type { CustomerAppointment } from "@/lib/customer/customer.types";

export type RescheduleFlowProps = {
  appointment: CustomerAppointment;
};

export type RescheduleStep = 0 | 1;

export type RescheduleState = {
  step: RescheduleStep;
  date: string;
  time: string;
  loading: boolean;
  canContinue: boolean;
  chooseDate: (iso: string) => void;
  chooseTime: (time: string) => void;
  back: () => void;
  next: () => void;
  move: () => void;
};

export type RescheduleActionsProps = Pick<RescheduleState, "step" | "canContinue" | "next" | "move"> & {
  date: string;
  time: string;
};

export type ChangeReviewProps = RescheduleFlowProps & {
  date: string;
  time: string;
};
