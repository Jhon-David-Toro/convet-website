import type { SupplierValues } from "./SupplierModal.types";

export const MODAL_TITLE = "Add supplier";

export const MODAL_DESCRIPTION = "Used when receiving stock.";

export const MODAL_WIDTH = "35rem";

export const EMPTY_SUPPLIER: SupplierValues = { company: "", email: "", phone: "+297 ", notes: "" };

export const EMAIL_LABEL = "Contact email";

export const PHONE_LABEL = "Phone";

export const NOTES_PLACEHOLDER = "Delivers Tue and Fri.";

export const NOTES_HELPER = "Optional, helps the team remember how to order.";

export const SUBMIT_LABEL = "Save supplier";

export const SAVED_MESSAGE = "Supplier saved.";

export const COMPANY_ERROR = "Enter the company name.";
