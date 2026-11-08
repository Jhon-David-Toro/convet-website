
import type { AddPetState, NewPetErrors, NewPetValues } from "@/components/sections/MyPets/MyPets.types";

/** State of the "Edit pet" form: the values, the errors, the saving step and the handlers. */
export type EditPetState = Omit<AddPetState, "file" | "selectFile" | "removeFile">;

export type UseEditPetParams = {
  idPet: string;
  initial: NewPetValues;
  onSave: (idPet: string, values: NewPetValues) => Promise<{ ok: boolean; fieldErrors?: Record<string, string>; message?: string }>;
  /** Called only after the backend saved the changes, with the values that were saved. */
  onSaved: (saved: NewPetValues) => void;
};
