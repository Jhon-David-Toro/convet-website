import type { ClassPart } from "./cx.types";


/**
 * Joins class names, discarding falsy values (`cond && styles.x`, optional `className`).
 *
 * @param parts Class names to join; falsy values (`false`, `null`, `undefined`, `""`) are ignored.
 * @returns The class names joined by a space; an empty string when none is truthy.
 */
export const cx = (...parts: ClassPart[]) => parts.filter(Boolean).join(" ");
