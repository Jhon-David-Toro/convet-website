export const EMERGENCY_PHONE = "593-0404";

export const EMERGENCY_PHONE_HREF = "tel:+2975930404";

export const WHATSAPP_PHONE = "+297 593 0404";

export const WHATSAPP_HREF = "https://wa.me/2975930404";

export const BOOKING_HREF = "/book";

export const CLINIC_LOCATION = process.env.NEXT_PUBLIC_CLINIC_LOCATION || "Savaneta 40A, Oranjestad, Aruba";

export const CLINIC_ADDRESS = "Savaneta 40A, Oranjestad";

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CLINIC_LOCATION)}`;
