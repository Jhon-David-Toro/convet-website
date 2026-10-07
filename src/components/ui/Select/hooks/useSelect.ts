import { useState } from "react";

import { NO_ACTIVE_INDEX } from "../Select.constants";
import type { UseSelectParams } from "../Select.types";
import { initialActiveIndex } from "../Select.utils";
import { useSelectKeyboard } from "./useSelectKeyboard";
import { useSelectValue } from "./useSelectValue";

/**
 * State and behaviour of a `Select`: value, open state, highlighted option and keyboard handling.
 *
 * @param params Options, see {@link UseSelectParams}.
 * @param params.onKeyDown Called when the user presses a key on the trigger, before the select handles it.
 * @param params.valueParams Remaining properties, forwarded to the root element.
 * @returns Object with `current`, `selected`, `open`, `activeIndex`, `setActiveIndex`, `choose`, `close`, `handleKeyDown`, `toggle`.
 */
export function useSelect({ onKeyDown, ...valueParams }: UseSelectParams) {
  const { options } = valueParams;
  const { current, selected, selectedIndex, commit } = useSelectValue(valueParams);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(NO_ACTIVE_INDEX);

  /**
   * Closes the list.
   */
  const close = () => setOpen(false);
  /**
   * Opens the list and highlights an option.
   *
   * @param index Option to highlight; defaults to the selected one, or the first enabled one.
   */
  const openList = (index = initialActiveIndex(options, selectedIndex)) => {
    setActiveIndex(index);
    setOpen(true);
  };
  /**
   * Chooses the option at `index` unless it is disabled, then closes the list.
   *
   * @param index Index of the option to choose.
   */
  const choose = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    commit(option.value);
    close();
  };

  const handleKeyDown = useSelectKeyboard({ options, open, activeIndex, onKeyDown, actions: { openList, choose, close, setActiveIndex } });

  /** Closes the list when it is open and opens it when it is closed. */
  const toggle = () => (open ? close() : openList());

  return { current, selected, open, activeIndex, setActiveIndex, choose, close, handleKeyDown, toggle };
}
