import type { ChangeEvent, ClipboardEvent, ComponentPropsWithRef, KeyboardEvent, RefObject } from "react";

export type CodeInputProps = Omit<ComponentPropsWithRef<"div">, "onChange" | "children"> & {
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  length?: number;
  invalid?: boolean;
  disabled?: boolean;
};

export type UseCodeInputParams = Pick<CodeInputProps, "value" | "onValueChange"> & {
  length: number;
};

export type CodeFocus = {
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
  focusBox: (index: number) => void;
};

export type CodeInputHandlers = {
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
  handleChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
  handlePaste: (event: ClipboardEvent<HTMLInputElement>) => void;
};

export type ReplaceDigitsParams = {
  value: string;
  index: number;
  digits: string;
  length: number;
};
