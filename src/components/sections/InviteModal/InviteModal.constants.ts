import { Calendar, Clipboard, Settings, Stethoscope } from "@/components/ui/Icon";
import type { SelectOption } from "@/components/ui/Select";

import type { InviteValues, RoleOption } from "./InviteModal.types";

export const MODAL_TITLE = "Invite team member";

export const MODAL_DESCRIPTION = "They receive an email to create their sign-in. A Staff ID is assigned automatically.";

export const MODAL_WIDTH = "38.75rem";

export const NEXT_STAFF_ID = "STF-0007";

export const TAKEN_EMAILS = ["jose.r@convet.aw", "anna@example.com"];

export const ROLE_OPTIONS: RoleOption[] = [
  { value: "veterinarian", icon: Stethoscope, title: "Veterinarian", subtitle: "Needs a Vet number (VET-)", numberLabel: "Vet number", suggestion: "VET-005" },
  { value: "assistant", icon: Clipboard, title: "Vet assistant", subtitle: "Needs an Assistant number (AST-)", numberLabel: "Assistant number", suggestion: "AST-002" },
  { value: "receptionist", icon: Calendar, title: "Receptionist", subtitle: "Schedule, clients, payments" },
  { value: "administrator", icon: Settings, title: "Administrator", subtitle: "Full access incl. Team & Settings" },
];

export const INITIAL_INVITE: InviteValues = { name: "", email: "", role: "veterinarian", number: "VET-005", location: "main" };

export const LOCATION_OPTIONS: SelectOption[] = [{ value: "main", label: "Main clinic" }];

export const NUMBER_HELPER = "Suggested next free number. Shown on records this person signs.";

export const SUBMIT_LABEL = "Send invitation";

export const SAVING_LABEL = "Sending…";

export const NAME_ERROR = "Enter the full name.";

export const NUMBER_ERROR = "Enter the number, e.g. VET-005.";

export const TAKEN_ERROR = "Already in use.";

export const TAKEN_TITLE = "This email already has an account";

export const DONE_TITLE = "Invitation sent";

export const EXPIRY_TITLE = "The link expires in 7 days.";

export const EXPIRY_NOTE = "You can resend or cancel it from Team.";

export const COPY_LABEL = "Copy invite link";

export const COPIED_MESSAGE = "Invite link copied.";

export const DONE_LABEL = "Done";

export const USER_ID_PLACEHOLDER = "Created when accepted";
