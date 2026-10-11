import { WHATSAPP_HREF } from "./site.constants";

/**
 * Link that opens the clinic WhatsApp chat with a prefilled message.
 *
 * @param text Message that appears in the compose box.
 * @returns The WhatsApp link with the encoded message.
 */
export function whatsappLink(text: string): string {
  return `${WHATSAPP_HREF}?text=${encodeURIComponent(text)}`;
}
