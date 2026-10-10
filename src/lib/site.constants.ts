/** Emergency phone number of the clinic, as shown to people. */
export const EMERGENCY_PHONE = "593-0404";

/** Link that dials the emergency phone number. */
export const EMERGENCY_PHONE_HREF = "tel:+2975930404";

/** WhatsApp number of the clinic, as shown to people. */
export const WHATSAPP_PHONE = "+297 593 0404";

/** Link that opens a WhatsApp chat with the clinic. */
export const WHATSAPP_HREF = "https://wa.me/2975930404";

/** Page where people book a visit. */
export const BOOKING_HREF = "/book";

/** Address or "lat,lng" of the clinic, used by the map and the directions link. */
export const CLINIC_LOCATION = process.env.NEXT_PUBLIC_CLINIC_LOCATION || "Savaneta 40A, Oranjestad, Aruba";

/** Street address shown in the page copy (the map keeps the full location). */
export const CLINIC_ADDRESS = "Savaneta 40A, Oranjestad";

/** Google Maps Embed API key; without it the stylized map is shown. */
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

/** Link that opens turn-by-turn directions to the clinic in Google Maps. */
export const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CLINIC_LOCATION)}`;
