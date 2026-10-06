import type { ComponentPropsWithRef, CSSProperties, Ref, RefObject } from "react";

import type { FieldMessageProps } from "@/components/ui/Field";

/** Props of the `MaskedInputBase` component. */
export type MaskedInputBaseProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "value" | "defaultValue" | "onChange" | "size"
> &
  FieldMessageProps & {
    /** Already formatted value, e.g. "07 / 15 / 2023". Omit it to use the input uncontrolled. */
    value?: string;
    /** Initial value when uncontrolled. */
    defaultValue?: string;
    /** Called with the new value. */
    onValueChange?: (value: string) => void;
  };

/** Date picker options. */
export type DatePickerOptions = {
  /** Earlier days are disabled in the calendar. */
  minDate?: Date;
  /** Later days are disabled in the calendar. */
  maxDate?: Date;
  /** "Today", defaults to the current date. */
  today?: Date;
};

/** Time list options. */
export type TimePickerOptions = {
  /** First time in the list, defaults to "7:00 AM". */
  from?: string;
  /** Last time in the list, defaults to "7:00 PM". */
  to?: string;
  /** Minutes between times, defaults to 15. */
  stepMinutes?: number;
};

/** Props of the `MaskedInput` component. */
export type MaskedInputProps = MaskedInputBaseProps &
  DatePickerOptions &
  TimePickerOptions & {
    /** Mask of the field: `"date"` or `"time"`. */
    mask: "date" | "time";
  };

/** What the masked input must do in response to a key press. */
export type MaskedKeyCommand = {
  /** Action shown with the message: a link (`href`) or a button (`onClick`). */
  action: "open" | "move" | "commit" | "close";
  /** Target time slot for `move`. */
  index?: number;
  /** Whether the browser default for the key must be cancelled. */
  preventDefault: boolean;
};

/** State of the masked input as seen by the keyboard handler. */
export type MaskedKeyState = {
  /** Whether the popup or menu is open. */
  open: boolean;
  /** Index of the highlighted time slot, or -1 when none. */
  activeIndex: number;
  /** Number of time slots in the list. */
  slotCount: number;
};

/** Subset of a keyboard event the masked input needs. */
export type MaskedKeyEvent = Pick<KeyboardEvent, "key" | "altKey">;

/** Actions the keyboard commands can trigger on the picker. */
export type MaskedActions = {
  /** Called when open picker happens. */
  openPicker: () => void;
  /** Called when close happens. */
  close: () => void;
  /** Called when set active index happens. */
  setActiveIndex: (index: number) => void;
  /** Commits the highlighted time slot and closes the picker. */
  commitActive: () => void;
};

/** Inputs of the `useMaskedValue` hook. */
export type UseMaskedValueParams = Pick<MaskedInputProps, "value" | "defaultValue" | "onValueChange">;

/** Inputs of the `usePicker` hook. */
export type UsePickerParams = Pick<MaskedInputProps, "mask"> & {
  /** Index of the selected time slot, or -1. */
  selectedIndex: number;
  /** Id of the picker popup, used to reference its options. */
  popupId: string;
  /** Moves focus back to the text input. */
  focusInput: () => void;
};

/** Inputs of the `useMaskedKeyboard` hook. */
export type UseMaskedKeyboardParams = Pick<MaskedInputProps, "mask" | "onKeyDown"> & {
  /** Whether the popup or menu is open. */
  open: boolean;
  /** Index of the highlighted option, or -1 when none. */
  activeIndex: number;
  /** Number of time slots in the list. */
  slotCount: number;
  /** Operations the keyboard commands can trigger. */
  actions: MaskedActions;
};

/** Inputs of the `useMaskedInput` hook. */
export type UseMaskedInputParams = Pick<
  MaskedInputProps,
  "mask" | "value" | "defaultValue" | "onValueChange" | "from" | "to" | "stepMinutes" | "onKeyDown"
> & {
  /** Id of the picker popup, used to reference its options. */
  popupId: string;
  /** Text input, to move focus back to it when the picker closes. */
  inputRef: RefObject<HTMLInputElement | null>;
};

/** Props shared by the date and time popups. */
export type PickerPopupProps = {
  /** Element id. */
  id: string;
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
  /** Inline style, used to position the floating panel. */
  style?: CSSProperties;
};

/** Props of the `DatePickerPopup` component. */
export type DatePickerPopupProps = PickerPopupProps &
  DatePickerOptions & {
    /** Currently selected date, or `null` when the value is empty or incomplete. */
    selected: Date | null;
    /** Called with the chosen day. */
    onSelect: (date: Date) => void;
  };

/** Props of the `TimePickerPopup` component. */
export type TimePickerPopupProps = PickerPopupProps & {
  /** Time slots, formatted as "9:45 AM". */
  slots: string[];
  /** Currently selected time, formatted as "9:45 AM". */
  value: string;
  /** Index of the highlighted option, or -1 when none. */
  activeIndex: number;
  /** Called with the index to highlight. */
  onActiveIndexChange: (index: number) => void;
  /** Called with the chosen day. */
  onSelect: (slot: string) => void;
};

/** Props of the text input of a masked field. */
export type MaskedTextInputProps = Omit<
  MaskedInputBaseProps,
  "label" | "optional" | "helper" | "error" | "value" | "defaultValue" | "onValueChange"
> &
  Pick<MaskedInputProps, "mask"> & {
    /** Id, validity and description of the field. */
    field: { id: string; invalid: boolean; describedBy?: string };
    /** Id of the picker popup. */
    popupId: string;
    /** Current value. */
    value: string;
    /** Whether the popup or menu is open. */
    open: boolean;
    /** Index of the highlighted option, or -1 when none. */
    activeIndex: number;
    /** Ref of the text input. */
    inputRef: Ref<HTMLInputElement>;
    /** Called with the text the user typed. */
    onValueTyped: (raw: string) => void;
  };

/** Props of the button that opens the picker. */
export type PickerTriggerProps = Pick<MaskedInputProps, "mask" | "disabled"> & {
  /** Whether the popup or menu is open. */
  open: boolean;
  /** Id of the picker popup. */
  popupId: string;
  /** Called to open or close the popup. */
  onToggle: () => void;
};

/** Props of the popup that matches the mask (calendar or list of times). */
export type PickerPopupSwitchProps = Pick<MaskedInputProps, "mask" | "minDate" | "maxDate" | "today"> & {
  /** Id of the picker popup. */
  popupId: string;
  /** Inline style, used to position the floating panel. */
  style?: CSSProperties;
  /** Currently selected value. */
  current: string;
  /** Time slots, formatted as "9:45 AM". */
  slots: string[];
  /** Index of the highlighted option, or -1 when none. */
  activeIndex: number;
  /** Called with the index to highlight. */
  onActiveIndexChange: (index: number) => void;
  /** Called with the value the user chose. */
  onCommit: (value: string) => void;
};

/** Inputs of the `useMaskedHandlers` hook. */
export type UseMaskedHandlersParams = Pick<MaskedInputProps, "mask"> & {
  /** Current formatted value. */
  current: string;
  /** Stores a new value. */
  commit: (next: string) => void;
  /** State and controls of the picker popup. */
  picker: { open: boolean; openPicker: () => void; close: (returnFocus?: boolean) => void };
};
