import type { DialogControlProps } from "@/components/patterns/FormModal";
import type { SelectOption } from "@/components/ui/Select";
import type { FormModalSaveResult } from "@/lib/shared/useFormModal.types";

export type ServiceValues = {
  name: string;
  category: string;
  duration: string;
  buffer: string;
  vets: string[];
  online: boolean;
};

export type SaveService = (values: ServiceValues) => Promise<FormModalSaveResult<ServiceValues>>;

export type ServiceModalProps = DialogControlProps & {
  categories?: SelectOption[];
  vetNames?: string[];
  onSave?: SaveService;
};

export type ServiceDialogProps = Omit<ServiceModalProps, "open">;
