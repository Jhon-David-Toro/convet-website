import { Trash } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import type { UploadedFileProps } from "../FileUpload.types";
import styles from "../FileUpload.module.scss";

/**
 * The uploaded file with the button that removes it.
 *
 * @param props Props of the component, see {@link UploadedFileProps}.
 * @param props.content Prepared content to render.
 * @param props.removeLabel Accessible name of the remove button.
 * @param props.onFileRemove Called when the user removes the uploaded file.
 * @returns The rendered element.
 */
export function UploadedFile({ content, removeLabel = "Remove file", onFileRemove }: UploadedFileProps) {
  return (
    <>
      <div className={styles.content}>{content}</div>
      <IconButton icon={Trash} label={removeLabel} onClick={onFileRemove} />
    </>
  );
}
