export type AppointmentValues = {
  patient: string;
  service: string;
  vet: string;
  date: string;
  time: string;
  notes: string;
  notify: boolean;
};

export type AppointmentDialogProps = {
  onClose: () => void;
};

export type SlotPickerProps = {
  vetId: string;
  date: string;
  time: string;
  error?: string;
  onPick: (time: string) => void;
};
