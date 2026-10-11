import { KEYS } from "@/lib/shared/keys.constants";

import { SELECT_NAVIGATION_KEYS } from "./Select.constants";
import type { SelectActions, SelectCommand, SelectKeyEvent, SelectKeyState, SelectOption } from "./Select.types";

/**
 * Finds the first enabled option, walking from `from` in the direction of `step`.
 *
 * @param options Options of the list.
 * @param from Start of the range.
 * @param step Distance between two consecutive items.
 * @returns The option index, or -1 when no enabled option is found.
 */
export const findEnabledIndex = (options: SelectOption[], from: number, step: 1 | -1): number => {
  for (let index = from; index >= 0 && index < options.length; index += step) {
    if (!options[index].disabled) return index;
  }
  return -1;
};

/**
 * Option highlighted when the list opens: the selected one, or the first enabled one.
 *
 * @param options Options of the list.
 * @param selectedIndex Index of the selected option, or -1.
 * @returns The index of the option to highlight when the list opens.
 */
export const initialActiveIndex = (options: SelectOption[], selectedIndex: number): number =>
  selectedIndex >= 0 ? selectedIndex : findEnabledIndex(options, 0, 1);

/**
 * Finds the first enabled option whose label starts with `letter`, wrapping around the list.
 *
 * @param options Options of the list.
 * @param letter Lower-case letter typed by the user.
 * @param start Index where the search begins.
 * @returns The option index, or `undefined` when nothing matches.
 */
export const findByLetter = (options: SelectOption[], letter: string, start: number): number | undefined => {
  const indexes = [...options.keys()];
  return [...indexes.slice(start), ...indexes.slice(0, start)].find(
    (index) => !options[index].disabled && options[index].label.toLowerCase().startsWith(letter),
  );
};

/**
 * Whether the key press types a character (no modifier held).
 *
 * @param params Options, see {@link SelectKeyEvent}.
 * @param params.key Value of `KeyboardEvent.key`.
 * @param params.ctrlKey Whether Ctrl is held.
 * @param params.metaKey Whether Meta (Cmd) is held.
 * @param params.altKey Whether Alt is held.
 * @returns `true` when the key press types a character (no modifier held).
 */
export const isPrintableKey = ({ key, ctrlKey, metaKey, altKey }: SelectKeyEvent): boolean =>
  key.length === 1 && !ctrlKey && !metaKey && !altKey;

/**
 * Resolves Escape: closes the list when it is open, otherwise the key is not handled.
 *
 * @param params Options, see {@link SelectKeyState}.
 * @param params.open Whether the popup or menu is open.
 * @returns The Escape: closes the list when it is open, otherwise the key is not handled.
 */
const closeIfOpen = ({ open }: SelectKeyState): SelectCommand | null => (open ? { action: "close", preventDefault: true } : null);

/**
 * Resolves Enter and Space: chooses the highlighted option when the list is open, otherwise opens it.
 *
 * @param params Options, see {@link SelectKeyState}.
 * @param params.open Whether the popup or menu is open.
 * @returns The Enter and Space: chooses the highlighted option when the list is open, otherwise opens it.
 */
const openOrChoose = ({ open }: SelectKeyState): SelectCommand => ({ action: open ? "choose" : "open", preventDefault: true });

/**
 * Resolves a navigation key (arrows, Home, End): opens the list when closed, otherwise moves the highlight.
 *
 * @param key Value of `KeyboardEvent.key`.
 * @param params Options, see {@link SelectKeyState}.
 * @param params.options Options of the list.
 * @param params.open Whether the popup or menu is open.
 * @param params.activeIndex Index of the highlighted option, or -1 when none.
 * @returns The navigation key (arrows, Home, End): opens the list when closed, otherwise moves the highlight.
 */
const navigate = (key: string, { options, open, activeIndex }: SelectKeyState): SelectCommand | null => {
  if (!open) return key === KEYS.arrowDown || key === KEYS.arrowUp ? { action: "open", preventDefault: true } : null;
  const { from, step } = SELECT_NAVIGATION_KEYS[key](activeIndex, options.length);
  return { action: "move", index: findEnabledIndex(options, from, step), preventDefault: true };
};

/**
 * Resolves a printable key: jumps to the next option whose label starts with that letter.
 *
 * @param letter Lower-case letter typed by the user.
 * @param params Options, see {@link SelectKeyState}.
 * @param params.options Options of the list.
 * @param params.open Whether the popup or menu is open.
 * @param params.activeIndex Index of the highlighted option, or -1 when none.
 * @returns The printable key: jumps to the next option whose label starts with that letter.
 */
const typeAhead = (letter: string, { options, open, activeIndex }: SelectKeyState): SelectCommand | null => {
  const match = findByLetter(options, letter, open ? activeIndex + 1 : 0);
  return match === undefined ? null : { action: open ? "move" : "open", index: match, preventDefault: false };
};

/** How each special key resolves; every other printable key is a type-ahead search. */
const KEY_RESOLVERS: Record<string, (key: string, state: SelectKeyState) => SelectCommand | null> = {
  [KEYS.escape]: (_key, state) => closeIfOpen(state),
  [KEYS.enter]: (_key, state) => openOrChoose(state),
  [KEYS.space]: (_key, state) => openOrChoose(state),
  ...Object.fromEntries(Object.keys(SELECT_NAVIGATION_KEYS).map((key) => [key, navigate])),
};

/**
 * Maps a key press to the command it triggers for the current state of the select.
 *
 * Follows the select-only combobox pattern: arrows, Home and End move the active option,
 * Enter and Space open or choose, Escape closes, and printable keys jump to a matching label.
 *
 * @param event Keyboard event, or the subset of it that matters.
 * @param state Current state of the component, as seen by the key handler.
 * @returns The command to run, or `null` when the key is not handled.
 */
export function resolveSelectKey(event: SelectKeyEvent, state: SelectKeyState): SelectCommand | null {
  const resolver = KEY_RESOLVERS[event.key];
  if (resolver) return resolver(event.key, state);
  return isPrintableKey(event) ? typeAhead(event.key.toLowerCase(), state) : null;
}

/** What each command does to the select. */
const COMMAND_RUNNERS: Record<SelectCommand["action"], (actions: SelectActions, command: SelectCommand, activeIndex: number) => void> = {
  open: (actions, { index }) => actions.openList(index),
  choose: (actions, _command, activeIndex) => actions.choose(activeIndex),
  close: (actions) => actions.close(),
  move: (actions, { index = -1 }) => index >= 0 && actions.setActiveIndex(index),
};

/**
 * Runs a keyboard command against the select.
 *
 * @param command Command to run.
 * @param actions Operations the command can trigger.
 * @param activeIndex Index of the highlighted option, or -1 when none.
 */
export const runSelectCommand = (command: SelectCommand, actions: SelectActions, activeIndex: number): void =>
  COMMAND_RUNNERS[command.action](actions, command, activeIndex);

/**
 * Id of the highlighted option, for `aria-activedescendant`; `undefined` while the list is closed or nothing is highlighted.
 *
 * @param listboxId Id of the list of options.
 * @param open Whether the popup is open.
 * @param activeIndex Index of the highlighted option, or -1 when none.
 * @returns The id of the highlighted option, or `undefined`.
 */
export const getActiveDescendant = (listboxId: string, open: boolean, activeIndex: number): string | undefined =>
  open && activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined;
