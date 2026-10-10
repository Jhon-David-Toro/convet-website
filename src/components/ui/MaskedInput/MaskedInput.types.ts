import type { ComponentPropsWithRef, CSSProperties, Ref, RefObject } from "react";

import type { FieldMessageProps } from "@/components/ui/Field";

export type MaskedInputBaseProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "value" | "defaultValue" | "onChange" | "size"
> &
  FieldMessageProps & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
  };

export type DatePickerOptions = {
  minDate?: Date;
  maxDate?: Date;
  today?: Date;
};

export type TimePickerOptions = {
  from?: string;
  to?: string;
  stepMinutes?: number;
};

export type MaskedInputProps = MaskedInputBaseProps &
  DatePickerOptions &
  TimePickerOptions & {
    mask: "date" | "time";
  };

export type MaskedKeyCommand = {
  action: "open" | "move" | "commit" | "close";
  index?: number;
  preventDefault: boolean;
};

export type MaskedKeyState = {
  open: boolean;
  activeIndex: number;
  slotCount: number;
};

export type MaskedKeyEvent = Pick<KeyboardEvent, "key" | "altKey">;

export type MaskedActions = {
  openPicker: () => void;
  close: () => void;
  setActiveIndex: (index: number) => void;
  commitActive: () => void;
};

export type UseMaskedValueParams = Pick<MaskedInputProps, "value" | "defaultValue" | "onValueChange">;

export type UsePickerParams = Pick<MaskedInputProps, "mask"> & {
  selectedIndex: number;
  popupId: string;
  focusInput: () => void;
};

export type UseMaskedKeyboardParams = Pick<MaskedInputProps, "mask" | "onKeyDown"> & {
  open: boolean;
  activeIndex: number;
  slotCount: number;
  actions: MaskedActions;
};

export type UseMaskedInputParams = Pick<
  MaskedInputProps,
  "mask" | "value" | "defaultValue" | "onValueChange" | "from" | "to" | "stepMinutes" | "onKeyDown"
> & {
  popupId: string;
  inputRef: RefObject<HTMLInputElement | null>;
};

export type PickerPopupProps = {
  id: string;
  label: string;
  style?: CSSProperties;
};

export type DatePickerPopupProps = PickerPopupProps &
  DatePickerOptions & {
    selected: Date | null;
    onSelect: (date: Date) => void;
  };

export type TimePickerPopupProps = PickerPopupProps & {
  slots: string[];
  value: string;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSelect: (slot: string) => void;
};

export type MaskedTextInputProps = Omit<
  MaskedInputBaseProps,
  "label" | "optional" | "helper" | "error" | "value" | "defaultValue" | "onValueChange"
> &
  Pick<MaskedInputProps, "mask"> & {
    field: { id: string; invalid: boolean; describedBy?: string };
    popupId: string;
    value: string;
    open: boolean;
    activeIndex: number;
    inputRef: Ref<HTMLInputElement>;
    onValueTyped: (raw: string) => void;
  };

export type PickerTriggerProps = Pick<MaskedInputProps, "mask" | "disabled"> & {
  open: boolean;
  popupId: string;
  onToggle: () => void;
};

export type PickerPopupSwitchProps = Pick<MaskedInputProps, "mask" | "minDate" | "maxDate" | "today"> & {
  popupId: string;
  style?: CSSProperties;
  current: string;
  slots: string[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onCommit: (value: string) => void;
};

export type UseMaskedHandlersParams = Pick<MaskedInputProps, "mask"> & {
  current: string;
  commit: (next: string) => void;
  picker: { open: boolean; openPicker: () => void; close: (returnFocus?: boolean) => void };
};
