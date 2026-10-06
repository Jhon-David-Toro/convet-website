import { GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_SEARCH_URL } from "./Map.constants";

/**
 * Builds the Google Maps Embed API URL that shows `location` as a place.
 *
 * @param apiKey Google Maps Embed API key.
 * @param location Address or "lat,lng" to show.
 * @returns The Google Maps Embed API URL that shows `location` as a place.
 */
export const buildEmbedUrl = (apiKey: string, location: string): string =>
  `${GOOGLE_MAPS_EMBED_URL}?key=${apiKey}&q=${encodeURIComponent(location)}`;

/**
 * Builds the URL that opens `location` in Google Maps.
 *
 * @param location Address or "lat,lng" to show.
 * @returns The URL that opens `location` in Google Maps.
 */
export const buildSearchUrl = (location: string): string =>
  `${GOOGLE_MAPS_SEARCH_URL}?api=1&query=${encodeURIComponent(location)}`;

/**
 * Converts an offset on a canvas of `size` px to a CSS percentage.
 *
 * @param offset Offset in px on the canvas.
 * @param size Size of the component.
 * @returns The offset on a canvas of `size` px to a CSS percentage.
 */
export const toPercent = (offset: number, size: number): string => `${(offset / size) * 100}%`;
