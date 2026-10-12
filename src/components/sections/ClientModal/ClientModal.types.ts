export type ClientValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  invite: boolean;
};

export type ClientModalMode = "new" | "edit";

export type ClientModalProps = {
  open: boolean;
  mode: ClientModalMode;
  onClose: () => void;
  initial?: ClientValues;
  clientLabel?: string;
};

export type ClientDialogProps = Omit<ClientModalProps, "open">;
