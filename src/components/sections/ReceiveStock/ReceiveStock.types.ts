import type { CatalogProduct, ReceiptLine } from "@/lib/admin/admin.types";

export type ReceiptHeader = {
  supplier: string;
  invoice: string;
  receivedOn: string;
};

export type ReceiptState = {
  header: ReceiptHeader;
  lines: ReceiptLine[];
  errorCount: number;
  setHeader: <Field extends keyof ReceiptHeader>(field: Field, value: ReceiptHeader[Field]) => void;
  setLine: (id: string, patch: Partial<ReceiptLine>) => void;
  addLine: () => void;
  removeLine: (id: string) => void;
  save: () => void;
};

export type ReceiptLinesState = Pick<ReceiptState, "lines" | "setLine" | "addLine" | "removeLine">;

export type SupplierCardProps = Pick<ReceiptState, "header" | "setHeader">;

export type ProductsCardProps = {
  receipt: ReceiptState;
};

export type ReceiptLineViewProps = {
  line: ReceiptLine;
  error?: string;
  onChange: (patch: Partial<ReceiptLine>) => void;
  onRemove: () => void;
};

export type ProductMatchesProps = {
  line: ReceiptLine;
  onPick: (productId: string) => void;
};

export type ProductChoiceProps = {
  product: CatalogProduct;
  name: string;
  checked: boolean;
  onPick: (productId: string) => void;
};

export type LineProductFieldsProps = Pick<ReceiptLineViewProps, "line" | "onChange">;

export type LineStockFieldsProps = LineFieldsProps;

export type LineFieldsProps = Pick<ReceiptLineViewProps, "line" | "error" | "onChange" | "onRemove">;

export type ReceiptFooterProps = {
  errorCount: number;
  onSave: () => void;
};
