import type { DialogControlProps } from "@/components/patterns/FormModal";
import type { ClosureEntry } from "@/lib/admin/admin.types";

export type ClosureValues = {
  date: string;
  reason: string;
};

export type ClosureModalProps = DialogControlProps & {
  onAdd: (closure: ClosureEntry) => void;
};

export type ClosureDialogProps = Pick<ClosureModalProps, "onClose" | "onAdd">;
