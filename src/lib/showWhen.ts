import type { ReactNode } from "react";

/**
 * Keeps a node only when a condition holds, so a component can pass optional parts without a ternary.
 *
 * @param show Whether the node should be shown.
 * @param node Node to show.
 * @returns The node, or `undefined` when it should not be shown.
 */
export function showWhen(show: boolean, node: ReactNode): ReactNode | undefined {
  return show ? node : undefined;
}
