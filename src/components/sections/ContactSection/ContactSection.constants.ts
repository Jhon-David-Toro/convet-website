import type { SelectOption } from "@/components/ui/Select";

import type { ContactValues, OpeningHoursRow } from "./ContactSection.types";

export const EMPTY_VALUES: ContactValues = { name: "", phone: "", email: "", topic: "", message: "", consent: false };

export const CONTACT_EYEBROW = "Contact";

export const CONTACT_TITLE = "Talk to us";

export const CONTACT_DESCRIPTION = "WhatsApp is the fastest way to reach us. For urgent cases, call before coming.";

export const TOPIC_OPTIONS: SelectOption[] = [
  { value: "general", label: "General question" },
  { value: "appointment", label: "Appointment" },
  { value: "product", label: "Product availability" },
  { value: "other", label: "Something else" },
];

export const ERROR_MESSAGES = {
  name: "Enter your name.",
  topic: "Choose a topic.",
  message: "Write a short message.",
  consent: "Please agree so we can reply to you.",
} as const;

export const FORM_TITLE = "Send a message";

export const CONSENT_LABEL = "I agree that CONVET stores my message to reply to me.";

export const SUBMIT_LABEL = "Send message";

export const MESSAGE_HELPER = "Tell us about your pet and what you need.";

export const SENT_TITLE = "Message sent";

export const SENT_TEXT = "Thank you. We will reply by email or WhatsApp as soon as we can.";

export const SENT_ACTION_LABEL = "Send another message";

export const QUICK_TITLE = "Prefer to chat?";

export const QUICK_TEXT = "Message us on WhatsApp or call during opening hours.";

export const WHATSAPP_LABEL = "WhatsApp";

export const MAP_LABEL = "CONVET · Aruba";

export const HOURS_TITLE = "Opening hours";

export const OPENING_HOURS: OpeningHoursRow[] = [
  { days: "Monday – Friday", hours: "8:00 AM – 6:00 PM", highlight: true },
  { days: "Saturday", hours: "9:00 AM – 1:00 PM" },
  { days: "Sunday & public holidays", hours: "Closed" },
];
