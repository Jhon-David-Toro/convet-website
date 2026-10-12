import type { ClientValues } from "./ClientModal.types";

export const MODAL_WIDTH = "37.5rem";

export const EMPTY_CLIENT: ClientValues = { firstName: "", lastName: "", email: "", phone: "+297 ", address: "", invite: true };

export const NEW_TITLE = "New client";

export const NEW_DESCRIPTION = "Owner account for one or more pets. The client gets an email to set a password.";

export const EDIT_TITLE = "Edit client";

export const NEW_SUBMIT_LABEL = "Create client";

export const NEW_SAVING_LABEL = "Creating…";

export const EDIT_SUBMIT_LABEL = "Save changes";

export const NAME_HELPER = "As it appears on the vaccination card.";

export const EMAIL_HELPER = "Used to sign in. Must be unique.";

export const PHONE_LABEL = "Mobile (WhatsApp)";

export const ADDRESS_PLACEHOLDER = "Street, district";

export const INVITE_LABEL = "Send the account invitation email now";

export const INVITE_DESCRIPTION = "They can also be invited later from Client detail.";

export const FIRST_NAME_ERROR = "Enter the first name.";

export const LAST_NAME_ERROR = "Enter the last name.";

export const DONE_TITLE = "Client created";

export const INVITATION_TITLE = "Invitation email queued";

export const OPEN_CLIENT_LABEL = "Open client";

export const ADD_PET_LABEL = "Add a pet";

export const DONE_LABEL = "Done";
