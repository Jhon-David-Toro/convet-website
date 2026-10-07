/** Width in px of the Figma frame the paw positions are measured on. */
export const PAW_PATTERN_WIDTH = 480;

/** Height in px of the Figma frame the paw positions are measured on. */
export const PAW_PATTERN_HEIGHT = 360;

/** Paw prints on the 480×360 Figma frame: position (x, y) in px, size in px and rotation in degrees. */
export const PAW_PATTERN_PAWS = [
  { x: 30, y: 30, size: 64, rotate: -20 },
  { x: 210, y: 70, size: 44, rotate: 15 },
  { x: 380, y: 20, size: 56, rotate: -10 },
  { x: 110, y: 200, size: 52, rotate: 25 },
  { x: 300, y: 230, size: 70, rotate: -15 },
  { x: 420, y: 300, size: 40, rotate: 10 },
] as const;
