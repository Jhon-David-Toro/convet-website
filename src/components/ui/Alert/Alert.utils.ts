import { INTERRUPTING_TONES } from "./Alert.constants";
import type { AlertTone } from "./Alert.types";

/**
 * Errors and warnings interrupt (alert); info and success are announced without interrupting (status).
 *
 * @param tone Tone that decides the colors and the icon.
 * @returns `"alert"` for tones that interrupt, `"status"` for the rest.
 */
export const getAlertRole = (tone: AlertTone): "alert" | "status" => (INTERRUPTING_TONES.includes(tone) ? "alert" : "status");
