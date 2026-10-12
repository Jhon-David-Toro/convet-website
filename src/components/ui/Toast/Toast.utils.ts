import type { PointerEvent } from "react";

import { MOUSE_POINTER, TOAST_DEFAULT_DURATION_MS } from "./Toast.constants";
import type { ToastDurationParams, ToastItem } from "./Toast.types";

/**
 * Milliseconds before a toast dismisses itself.
 *
 * @param params Options, see {@link ToastDurationParams}.
 * @param params.duration Milliseconds before it dismisses itself (defaults to 5000). Paused while the pointer or focus is over it.
 * @returns The duration in milliseconds.
 */
export const toastDuration = ({ duration }: ToastDurationParams): number => duration ?? TOAST_DEFAULT_DURATION_MS;

/**
 * Items without the toast `id`.
 *
 * @param items Items currently on screen.
 * @param id Id of the item.
 * @returns The items without the removed toast.
 */
export const removeToast = (items: ToastItem[], id: number): ToastItem[] => items.filter((item) => item.id !== id);

/**
 * Items with `item` added at the end.
 *
 * @param items Items currently on screen.
 * @param item Item to add.
 * @returns The items with the new toast at the end.
 */
export const appendToast = (items: ToastItem[], item: ToastItem): ToastItem[] => [...items, item];

/**
 * Returns the cleanup that cancels every pending timer of the map.
 *
 * @param timers Pending timers by toast id.
 * @returns The cleanup that cancels every pending timer of the map.
 */
export const cancelAllTimers = (timers: Map<number, ReturnType<typeof setTimeout>>) => () => timers.forEach((timer) => clearTimeout(timer));

/**
 * Whether a pointer event comes from a mouse. Touch and pen have no hover, so they must not pause the countdown: they would never fire the matching leave event.
 *
 * @param event Pointer event of the toast.
 * @returns `true` for a mouse.
 */
export const isMousePointer = (event: PointerEvent): boolean => event.pointerType === MOUSE_POINTER;
