import type { SubmitEvent } from "react";

import type { ActionResult } from "@/lib/api/api.types";
import type { PetItem } from "@/lib/customer/customer.types";

/** Saves a new pet; in the app it is a Server Action that calls the backend. */
export type SavePet = (values: NewPetValues) => Promise<ActionResult>;

export type MyPetsProps = {
  pets: PetItem[];
  /** Message to show instead of the pets when they could not be loaded. */
  loadError?: string;
  onAddPet?: SavePet;
  initialAddOpen?: boolean;
};

export type PetSex = "female" | "male" | "unknown";

export type NewPetValues = {
  name: string;
  species: string;
  breed: string;
  color: string;
  sex: PetSex;
  birthDate: string;
};

export type NewPetErrors = Partial<Record<"name" | "species" | "birthDate", string>>;

export type AddPetModalProps = {
  open: boolean;
  onClose: () => void;
  onSave?: SavePet;
};

export type UseAddPetParams = Pick<AddPetModalProps, "onClose" | "onSave">;

export type AddPetState = {
  values: NewPetValues;
  errors: NewPetErrors;
  age: string;
  /** True while the pet is being saved. */
  submitting: boolean;
  /** Error of the last save that is not tied to a field. */
  submitError?: string;
  file?: { name: string; description: string };
  setValue: <Field extends keyof NewPetValues>(field: Field, value: NewPetValues[Field]) => void;
  selectFile: (file: File) => void;
  removeFile: () => void;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export type AddPetFieldsProps = Pick<AddPetState, "values" | "errors" | "setValue">;

export type SexFieldProps = Pick<AddPetFieldsProps, "values" | "setValue">;

export type BirthFieldsProps = AddPetFieldsProps & Pick<AddPetState, "age">;

export type PetPhotoUploadProps = Pick<AddPetState, "file" | "selectFile" | "removeFile">;

export type MyPetsHeaderProps = {
  count: number;
  onAdd: () => void;
};

export type PetGridProps = {
  pets: PetItem[];
};

export type LoadErrorProps = {
  message: string;
};

export type EmptyPetsProps = {
  onAdd: () => void;
};
