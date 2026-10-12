import type { SelectOption } from "@/components/ui/Select";

import type { PatientValues } from "./PatientModal.types";

export const MODAL_TITLE = "New patient";

export const MODAL_DESCRIPTION = "A patient is the animal. Link it to an existing owner (client) or create the owner first.";

export const MODAL_WIDTH = "40rem";

export const TODAY = new Date(2026, 9, 9);

export const OWNER_NAME = "Carlos Croes";

export const OWNER_CODE = "CLI-0412";

export const EMPTY_PATIENT: PatientValues = { owner: OWNER_NAME, name: "", species: "", breed: "", color: "", birthDate: "", sex: "", microchip: "" };

export const SPECIES_OPTIONS: SelectOption[] = [
  { value: "", label: "Choose a species" },
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "bird", label: "Bird" },
  { value: "horse", label: "Horse" },
  { value: "other", label: "Other" },
];

export const SEX_OPTIONS: SelectOption[] = [
  { value: "", label: "Choose an option" },
  { value: "male", label: "Male" },
  { value: "male-neutered", label: "Male, neutered" },
  { value: "female", label: "Female" },
  { value: "female-spayed", label: "Female, spayed" },
];

export const MICROCHIP_PATTERN = /^\d{15}$/;

export const OWNER_LABEL = "Owner (client)";

export const NEW_CLIENT_LABEL = "New client instead";

export const OWNER_ERROR = "Choose the owner of the patient.";

export const NAME_ERROR = "Enter the name of the pet.";

export const SPECIES_ERROR = "Choose a species.";

export const COLOR_ERROR = "Color is required to identify the patient.";

export const BIRTH_ERROR = "Enter the date of birth, like 03 / 01 / 2018.";

export const FUTURE_ERROR = "Date can’t be in the future.";

export const SEX_ERROR = "Choose an option.";

export const MICROCHIP_ERROR = "Use 15 digits.";

export const MICROCHIP_HELPER = "15 digits";

export const SUBMIT_LABEL = "Create patient";

export const SAVED_MESSAGE = "Patient created.";
