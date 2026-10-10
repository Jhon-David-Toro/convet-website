import type { ComponentPropsWithRef, CSSProperties } from "react";

import type { FieldMessageProps } from "@/components/ui/Field";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = Omit<
  ComponentPropsWithRef<"button">,
  "value" | "defaultValue" | "onChange" | "children" | "type" | "role"
> &
  FieldMessageProps & {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    name?: string;
  };

export type SelectListboxProps = {
  id: string;
  labelledBy: string;
  options: SelectOption[];
  value: string;
  activeIndex: number;
  style?: CSSProperties;
  onActiveIndexChange: (index: number) => void;
  onChoose: (index: number) => void;
};

export type SelectKeyEvent = Pick<KeyboardEvent, "key" | "ctrlKey" | "metaKey" | "altKey">;

export type SelectKeyState = {
  options: SelectOption[];
  open: boolean;
  activeIndex: number;
};

export type SelectCommand = {
  action: "open" | "move" | "choose" | "close";
  index?: number;
  preventDefault: boolean;
};

export type UseSelectParams = Pick<SelectProps, "options" | "value" | "defaultValue" | "onValueChange"> & {
  onKeyDown?: SelectProps["onKeyDown"];
};

export type SelectActions = {
  openList: (index?: number) => void;
  choose: (index: number) => void;
  close: () => void;
  setActiveIndex: (index: number) => void;
};

export type UseSelectValueParams = Pick<UseSelectParams, "options" | "value" | "defaultValue" | "onValueChange">;

export type UseSelectKeyboardParams = Pick<UseSelectParams, "options" | "onKeyDown"> & {
  open: boolean;
  activeIndex: number;
  actions: SelectActions;
};

export type SelectTriggerProps = Omit<SelectProps, "options" | "value" | "defaultValue" | "onValueChange" | "name" | "label" | "optional" | "helper" | "error" | "className" | "onKeyDown"> & {
  field: { id: string; invalid: boolean; describedBy?: string };
  listboxId: string;
  open: boolean;
  activeIndex: number;
  selectedLabel?: string;
  onToggle: () => void;
  onKeyDown: NonNullable<SelectProps["onKeyDown"]>;
};

export type SelectAdornmentsProps = Pick<SelectProps, "name"> & {
  value: string;
};
