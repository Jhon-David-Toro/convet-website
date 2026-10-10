import type { BusyLabels } from "./labels.types";

/**
 * Label of a button that changes while its request is in flight.
 *
 * @param busy Whether the request is in flight.
 * @param labels Label to show while idle and while busy.
 * @returns The label for the current state.
 */
export function pickLabel(busy: boolean, labels: BusyLabels): string {
  return busy ? labels.busy : labels.idle;
}
