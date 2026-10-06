/** Size in px of the paw icon inside the map pin. */
export const MAP_PIN_ICON_SIZE = 26;

/** Width in px of the Figma frame the street positions are measured on. */
export const MAP_ART_WIDTH = 640;

/** Height in px of the Figma frame the road positions are measured on. */
export const MAP_ART_HEIGHT = 360;

/** Vertical offsets in px of the stylized horizontal roads. */
export const MAP_ROAD_OFFSETS = [30, 92, 154, 216, 278, 340];

/** Horizontal offsets in px of the stylized vertical streets. */
export const MAP_STREET_OFFSETS = [60, 200, 340, 480, 620];

/** Rotation of alternating roads, so the grid does not look mechanical. */
export const MAP_ROAD_TILTS = ["-4deg", "8deg"] as const;

/** Base URL of the Google Maps Embed API "place" mode. */
export const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed/v1/place";

/** Base URL of the Google Maps search page. */
export const GOOGLE_MAPS_SEARCH_URL = "https://www.google.com/maps/search/";
