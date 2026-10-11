import { FileUpload } from "@/components/ui/FileUpload";

import { REMOVE_FILE_LABEL, UPLOAD_ACCEPT } from "../MyPets.constants";
import type { PetPhotoUploadProps } from "../MyPets.types";

/**
 * Drop zone for a photo or a document of the pet.
 *
 * @param props Props of the component, see {@link PetPhotoUploadProps}.
 * @param props.file The chosen file, when there is one.
 * @param props.selectFile Called with the file the customer picked.
 * @param props.removeFile Removes the chosen file.
 * @returns The rendered element.
 */
export function PetPhotoUpload({ file, selectFile, removeFile }: PetPhotoUploadProps) {
  return <FileUpload accept={UPLOAD_ACCEPT} file={file} removeLabel={REMOVE_FILE_LABEL} onFileSelect={selectFile} onFileRemove={removeFile} />;
}
