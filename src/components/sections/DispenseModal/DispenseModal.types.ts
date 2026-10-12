import type { DialogControlProps } from "@/components/patterns/FormModal";
import type { StaffInventoryRow } from "@/lib/staff/staff.types";

export type DispenseValues = {
  patient: string;
  lot: string;
  quantity: string;
  instructions: string;
};

export type DispenseModalProps = DialogControlProps & {
  product: StaffInventoryRow;
};

export type DispenseContext = {
  product: StaffInventoryRow;
};
