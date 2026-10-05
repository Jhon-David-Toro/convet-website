import type { IconSize } from "./Icon.types";

/** Pixel size of each named icon size. */
export const ICON_PIXEL_SIZES: Record<IconSize, number> = { badge: 14, small: 16, medium: 20, large: 24 };

/** Stroke width in px at any size (`absoluteStrokeWidth`), as in the Figma icon set. */
export const ICON_STROKE_WIDTH = 1.75;
