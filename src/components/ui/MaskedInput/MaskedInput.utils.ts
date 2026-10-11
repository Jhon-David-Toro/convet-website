import { KEYS } from "@/lib/shared/keys.constants";

import { DATE_MASK, NO_ACTIVE_SLOT, TIME_MASK } from "./MaskedInput.constants";
import type {
  MaskedActions,
  MaskedInputProps,
  MaskedKeyCommand,
  MaskedKeyEvent,
  MaskedKeyState,
} from "./MaskedInput.types";

/** Command that opens the picker popup. */
const OPEN_COMMAND: MaskedKeyCommand = { action: "open", preventDefault: true };

/**
 * Resolves Enter in the time field: commits the highlighted slot while the list is open.
 *
 * @param params Options, see {@link MaskedKeyState}.
 * @param params.open Whether the popup or menu is open.
 * @param params.activeIndex Index of the highlighted time slot, or -1 when none.
 * @returns The Enter in the time field: commits the highlighted slot while the list is open.
 */
const resolveEnter = ({ open, activeIndex }: MaskedKeyState): MaskedKeyCommand | null =>
  open && activeIndex >= 0 ? { action: "commit", preventDefault: true } : null;

/**
 * Resolves an arrow key in the time field: opens the list, or moves the highlight one slot.
 *
 * @param key Value of `KeyboardEvent.key`.
 * @param params Options, see {@link MaskedKeyState}.
 * @param params.open Whether the popup or menu is open.
 * @param params.activeIndex Index of the highlighted time slot, or -1 when none.
 * @param params.slotCount Number of time slots in the list.
 * @returns The arrow key in the time field: opens the list, or moves the highlight one slot.
 */
const resolveArrow = (key: string, { open, activeIndex, slotCount }: MaskedKeyState): MaskedKeyCommand => {
  if (!open) return OPEN_COMMAND;
  const next = key === KEYS.arrowDown ? Math.min(activeIndex + 1, slotCount - 1) : Math.max(activeIndex - 1, 0);
  return { action: "move", index: next, preventDefault: true };
};

/** How each key resolves in the time field. */
const TIME_KEY_RESOLVERS: Record<string, (key: string, state: MaskedKeyState) => MaskedKeyCommand | null> = {
  [KEYS.tab]: () => ({ action: "close", preventDefault: false }),
  [KEYS.enter]: (_key, state) => resolveEnter(state),
  [KEYS.arrowDown]: resolveArrow,
  [KEYS.arrowUp]: resolveArrow,
};

/**
 * Whether a key press asks to open the date picker (Alt + Down Arrow).
 *
 * @param params Options, see {@link MaskedKeyEvent}.
 * @param params.altKey Whether Alt is held.
 * @param params.key Value of `KeyboardEvent.key`.
 * @returns `true` when a key press asks to open the date picker (Alt + Down Arrow).
 */
const isOpenDatePickerKey = ({ altKey, key }: MaskedKeyEvent): boolean => altKey && key === KEYS.arrowDown;

/**
 * Maps a key press to the command it triggers.
 *
 * Date field: Alt + Down Arrow opens the calendar. Time field: arrows open the list and move through it,
 * Enter commits the highlighted slot, and Tab closes the list.
 *
 * @param mask Mask of the field: `"date"` or `"time"`.
 * @param event Keyboard event, or the subset of it that matters.
 * @param state Current state of the component, as seen by the key handler.
 * @returns The command to run, or `null` when the key is not handled.
 */
export function resolveMaskedKey(mask: MaskedInputProps["mask"], event: MaskedKeyEvent, state: MaskedKeyState): MaskedKeyCommand | null {
  if (mask === DATE_MASK) return isOpenDatePickerKey(event) ? OPEN_COMMAND : null;
  return TIME_KEY_RESOLVERS[event.key]?.(event.key, state) ?? null;
}

/** What each command does to the picker. */
const COMMAND_RUNNERS: Record<MaskedKeyCommand["action"], (actions: MaskedActions, command: MaskedKeyCommand) => void> = {
  open: (actions) => actions.openPicker(),
  close: (actions) => actions.close(),
  move: (actions, { index }) => index !== undefined && actions.setActiveIndex(index),
  commit: (actions) => actions.commitActive(),
};

/**
 * Runs a keyboard command against the picker.
 *
 * @param command Command to run.
 * @param actions Operations the command can trigger.
 */
export const runMaskedCommand = (command: MaskedKeyCommand, actions: MaskedActions): void =>
  COMMAND_RUNNERS[command.action](actions, command);

/**
 * Time slot highlighted when the picker opens: the selected one, or the first. The date picker highlights none.
 *
 * @param mask Mask of the field: `"date"` or `"time"`.
 * @param selectedIndex Index of the selected option, or -1.
 * @returns The index of the time slot to highlight, or -1 for none.
 */
export const initialSlotIndex = (mask: MaskedInputProps["mask"], selectedIndex: number): number =>
  mask === TIME_MASK ? Math.max(selectedIndex, 0) : NO_ACTIVE_SLOT;

/**
 * ARIA attributes that turn the time input into a combobox bound to its list of slots.
 * The date input is a plain text field, so it gets none.
 *
 * @param mask Mask of the field: `"date"` or `"time"`.
 * @param open Whether the popup is open.
 * @param popupId Id of the popup; the id of each option is derived from it.
 * @param activeIndex Index of the highlighted option, or -1 when none.
 * @returns The ARIA attributes to spread on the input; empty for dates.
 */
export function getTimeComboboxProps(mask: MaskedInputProps["mask"], open: boolean, popupId: string, activeIndex: number) {
  if (mask !== TIME_MASK) return {};
  return {
    role: "combobox",
    "aria-autocomplete": "none",
    "aria-expanded": open,
    "aria-controls": open ? popupId : undefined,
    "aria-activedescendant": open && activeIndex >= 0 ? `${popupId}-${activeIndex}` : undefined,
  } as const;
}

/**
 * Scrolls the highlighted time slot into view when the list is open and a slot is highlighted.
 *
 * @param enabled Whether the behavior is active.
 * @param popupId Id of the popup; the id of each option is derived from it.
 * @param activeIndex Index of the highlighted option, or -1 when none.
 */
export function scrollSlotIntoView(enabled: boolean, popupId: string, activeIndex: number): void {
  if (!enabled || activeIndex < 0) return;
  document.getElementById(`${popupId}-${activeIndex}`)?.scrollIntoView?.({ block: "nearest" });
}
