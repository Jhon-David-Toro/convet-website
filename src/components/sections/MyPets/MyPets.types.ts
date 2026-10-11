import type { SubmitEvent } from "react";

import type { PetItem } from "@/lib/customer/customer.types";

export type MyPetsProps = {
  pets?: PetItem[];
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
  onSave?: (values: NewPetValues) => void;
};

export type UseAddPetParams = Pick<AddPetModalProps, "onClose" | "onSave">;

export type AddPetState = {
  values: NewPetValues;
  errors: NewPetErrors;
  age: string;
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

export type EmptyPetsProps = {
  onAdd: () => void;
};
