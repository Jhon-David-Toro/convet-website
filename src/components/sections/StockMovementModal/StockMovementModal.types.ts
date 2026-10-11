import type { ProductLot } from "@/lib/admin.types";

export type MovementType = "clinical-use" | "waste" | "expired" | "adjustment";

export type Direction = "remove" | "add";

export type StockMovementModalProps = {
  open: boolean;
  onClose: () => void;
  productName: string;
  lots: ProductLot[];
  initialType?: MovementType;
};

export type MovementFormProps = Pick<StockMovementModalProps, "lots" | "onClose"> & {
  initialType?: MovementType;
};

export type MovementValues = {
  type: MovementType;
  lot: string;
  direction: Direction;
  quantity: string;
  reason: string;
};

export type MovementFormState = {
  values: MovementValues;
  balance: number;
  quantityError?: string;
  reasonError?: string;
  canSubmit: boolean;
  setValue: <Field extends keyof MovementValues>(field: Field, value: MovementValues[Field]) => void;
  submit: () => void;
};

export type UseMovementFormParams = MovementFormProps;

export type TypeChipsProps = Pick<MovementFormState, "values" | "setValue">;

export type QuantityFieldsProps = Pick<MovementFormState, "values" | "setValue" | "balance" | "quantityError">;

export type MovementActionsProps = {
  type: MovementType;
  canSubmit: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};
