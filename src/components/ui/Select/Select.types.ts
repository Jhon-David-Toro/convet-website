import type { ComponentPropsWithRef, CSSProperties } from "react";

import type { FieldMessageProps } from "@/components/ui/Field";

/** An option of a select: value, visible label and disabled flag. */
export type SelectOption = {
  /** Current value. */
  value: string;
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
  /** Whether the control is disabled. */
  disabled?: boolean;
};

/** Props of the `Select` component. */
export type SelectProps = Omit<
  ComponentPropsWithRef<"button">,
  "value" | "defaultValue" | "onChange" | "children" | "type" | "role"
> &
  FieldMessageProps & {
    /** Options of the list. */
    options: SelectOption[];
    /** Controlled value. Omit it to use the select uncontrolled with `defaultValue`. */
    value?: string;
    /** Initial value when uncontrolled. */
    defaultValue?: string;
    /** Called with the new value. */
    onValueChange?: (value: string) => void;
    /** Text shown while there is no value. */
    placeholder?: string;
    /** Field name for native forms. */
    name?: string;
  };

/** Props of the open list of options. */
export type SelectListboxProps = {
  /** Element id; option ids are derived from it as `${id}-${index}`. */
  id: string;
  /** Id of the element that labels the list. */
  labelledBy: string;
  /** Options of the list. */
  options: SelectOption[];
  /** Value of the selected option. */
  value: string;
  /** Index of the option highlighted by the keyboard or the pointer. */
  activeIndex: number;
  /** Inline style, used to position the floating panel. */
  style?: CSSProperties;
  /** Called with the index to highlight. */
  onActiveIndexChange: (index: number) => void;
  /** Called with the day chosen by the user. */
  onChoose: (index: number) => void;
};

/** Subset of a keyboard event the select needs to decide what a key press does. */
export type SelectKeyEvent = Pick<KeyboardEvent, "key" | "ctrlKey" | "metaKey" | "altKey">;

/** Current state of the select, as seen by the keyboard handler. */
export type SelectKeyState = {
  /** Options of the list. */
  options: SelectOption[];
  /** Whether the popup or menu is open. */
  open: boolean;
  /** Index of the highlighted option, or -1 when none. */
  activeIndex: number;
};

/** What the select must do in response to a key press. */
export type SelectCommand = {
  /** Action shown with the message: a link (`href`) or a button (`onClick`). */
  action: "open" | "move" | "choose" | "close";
  /** Target option for `open` and `move`; -1 means no enabled option was found. */
  index?: number;
  /** Whether the browser default for the key (scrolling, typing) must be cancelled. */
  preventDefault: boolean;
};

/** Inputs of the `useSelect` hook. */
export type UseSelectParams = Pick<SelectProps, "options" | "value" | "defaultValue" | "onValueChange"> & {
  /** Called when the user presses a key on the trigger, before the select handles it. */
  onKeyDown?: SelectProps["onKeyDown"];
};

/** Actions the keyboard commands can trigger on the select. */
export type SelectActions = {
  /** Called when open list happens. */
  openList: (index?: number) => void;
  /** Called when choose happens. */
  choose: (index: number) => void;
  /** Called when close happens. */
  close: () => void;
  /** Called when set active index happens. */
  setActiveIndex: (index: number) => void;
};

/** Inputs of the `useSelectValue` hook. */
export type UseSelectValueParams = Pick<UseSelectParams, "options" | "value" | "defaultValue" | "onValueChange">;

/** Inputs of the `useSelectKeyboard` hook. */
export type UseSelectKeyboardParams = Pick<UseSelectParams, "options" | "onKeyDown"> & {
  /** Whether the popup or menu is open. */
  open: boolean;
  /** Index of the highlighted option, or -1 when none. */
  activeIndex: number;
  /** Operations the keyboard commands can trigger. */
  actions: SelectActions;
};

/** Props of the trigger button. */
export type SelectTriggerProps = Omit<SelectProps, "options" | "value" | "defaultValue" | "onValueChange" | "name" | "label" | "optional" | "helper" | "error" | "className" | "onKeyDown"> & {
  /** Id, validity and description of the field. */
  field: { id: string; invalid: boolean; describedBy?: string };
  /** Id of the list of options. */
  listboxId: string;
  /** Whether the popup or menu is open. */
  open: boolean;
  /** Index of the highlighted option, or -1 when none. */
  activeIndex: number;
  /** Text of the selected option, if any. */
  selectedLabel?: string;
  /** Called to open or close the popup. */
  onToggle: () => void;
  /** Called on key down; the component's own key handling runs after it unless the event is default-prevented. */
  onKeyDown: NonNullable<SelectProps["onKeyDown"]>;
};

/** Props of the decorations that sit next to the trigger. */
export type SelectAdornmentsProps = Pick<SelectProps, "name"> & {
  /** Current value, submitted through the hidden input. */
  value: string;
};
