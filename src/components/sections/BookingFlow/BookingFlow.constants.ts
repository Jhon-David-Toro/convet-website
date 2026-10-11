import type { BookingSelection, BookingStepId } from "./BookingFlow.types";

export const EMPTY_SELECTION: BookingSelection = { petId: "luna", serviceId: "", vetId: "", date: "", time: "", notes: "", whatsapp: true };

export const STEP_ORDER: BookingStepId[] = ["pet", "service", "vet", "datetime", "review", "confirmed"];

export const STEP_LABELS = ["Pet", "Service", "Vet", "Date & time", "Review"];

export const LOADING_MS = 600;

export const NEW_PET_ID = "new";

export const EXIT_HREF = "/app";

export const APPOINTMENTS_HREF = "/app/appointments";

export const OWNER_LINE = "Anna Lee · anna@example.com · WhatsApp +297 560 1234";

export const OWNER_CONTACT = { name: "Anna Lee", email: "anna@example.com", phone: "+297 560 1234" };

export const STEP_COPY: Record<BookingStepId, { title: string; subtitle?: string }> = {
  pet: { title: "Who is the visit for?", subtitle: "Choose one pet. You can book for another pet right after." },
  service: { title: "What does {pet} need?" },
  vet: { title: "Choose a vet", subtitle: "Each vet keeps their own schedule. After you choose, the calendar only shows the times that vet can attend." },
  datetime: { title: "Pick a day and time" },
  review: { title: "Review & confirm", subtitle: "Check every detail before you confirm. No payment is needed." },
  confirmed: { title: "Request confirmed!" },
};

export const SERVICE_SUBTITLE_NOTE = "Only services you can book online are shown for dogs.";

export const TIP_TITLE = "Tip: add both vaccines to one visit";

export const TIP_TEXT = "Mention the overdue leptospirosis vaccine in the notes on the last step.";

export const NEXT_AVAILABLE_PREFIX = "Next available:";

export const NOTES_LABEL = "Anything the vet should know?";

export const NOTES_HELPER = "Optional · max 500 characters";

export const OWNER_TITLE = "Owner & contact";

export const WHATSAPP_LABEL = "Send my confirmation and reminders on WhatsApp";

export const WHATSAPP_DESCRIPTION = "Also by email. You can change this in Settings.";

export const CONFIRM_LABEL = "Confirm appointment";

export const CONTINUE_LABEL = "Continue";

export const BACK_LABEL = "Back";

export const CANCEL_LABEL = "Cancel";

export const SLOT_TAKEN_TITLE = "just filled up";

export const SLOT_TAKEN_TEXT = "Another client took the 5th place while you were reviewing. Pick one of these nearby times — your other details are kept.";

export const CONFIRMED_ACTIONS = {
  calendar: "Add to calendar",
  reschedule: "Reschedule",
  appointments: "Go to my appointments",
  another: "Book for another pet",
  done: "Done",
};

export const WHATSAPP_BANNER = { title: "Confirm on WhatsApp", text: "Open the chat with your appointment pre-filled. Reply there to reschedule or ask a question." };

export const MS_PER_DAY = 86_400_000;

export const MS_PER_MINUTE = 60_000;

export const MINUTES_PER_HOUR = 60;

export const SUCCESS_ICON_SIZE = 40;

export const CHOICE_STEPS: BookingStepId[] = ["pet", "service", "vet"];

export const SIDE_STEPS: BookingStepId[] = ["pet", "service", "vet", "datetime"];

export const MOBILE_TITLES = { booking: "Book a visit", confirmed: "Confirmed" };
