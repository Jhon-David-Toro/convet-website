import type { SelectOption } from "@/components/ui/Select";

import type { NewPetValues, PetSex } from "./MyPets.types";

export const EMPTY_PET: NewPetValues = { name: "", species: "", breed: "", color: "", sex: "female", birthDate: "" };

export const TITLE = "My pets";

export const ADD_LABEL = "Add a pet";

export const SPECIES_OPTIONS: SelectOption[] = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "bird", label: "Bird" },
  { value: "other", label: "Other" },
];

export const BREEDS = ["Mixed breed", "Labrador retriever", "German shepherd", "Domestic shorthair", "Siamese", "Persian"];

export const BREEDS_LIST_ID = "pet-breeds";

export const SEX_OPTIONS: { value: PetSex; label: string }[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "unknown", label: "Unknown" },
];

export const MODAL_TITLE = "Add a pet";

export const MODAL_DESCRIPTION = "Basic profile: name, species, breed, color, sex and date of birth.";

export const FORM_ID = "add-pet-form";

export const UPLOAD_ACCEPT = "application/pdf,image/jpeg,image/png";

export const REMOVE_FILE_LABEL = "Remove file";

export const CANCEL_LABEL = "Cancel";

export const SAVE_LABEL = "Save pet";

export const ERROR_MESSAGES = {
  name: "Enter your pet's name.",
  species: "Choose a species.",
  birthDate: "Enter a valid date of birth.",
} as const;

export const BIRTH_HELPER = "Month / Day / Year. We calculate the age for you.";

export const AGE_LABEL = "Age (auto)";

export const AGE_EMPTY = "—";

export const AGE_NOTE = "As of today · read-only";

export const EMPTY_TITLE = "No pets yet";

export const EMPTY_TEXT = "Add your companion so we can keep their vaccines and visits in one place.";

export const MONTHS_PER_YEAR = 12;

export const KB = 1024;

export const FILE_DESCRIPTION_DIGITS = 1;
