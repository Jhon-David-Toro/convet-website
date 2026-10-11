"use client";

import { cx } from "@/lib/shared/cx";

import styles from "./FileUpload.module.scss";
import { FILE_UPLOAD_ROLES, UPLOADED_STATUS } from "./FileUpload.constants";
import type { FileUploadProps } from "./FileUpload.types";
import { getUploadStatus, getUploadView } from "./FileUpload.utils";
import { useFileDrop } from "./hooks/useFileDrop";
import { FileUploadContent } from "./parts/FileUploadContent";
import { UploadDropzone } from "./parts/UploadDropzone";
import { UploadedFile } from "./parts/UploadedFile";

/**
 * Zone to pick or drop a file. Client Component because of dragging and the file input.
 * It uploads nothing: it reports the file through `onFileSelect` and the consumer decides the state (`file` / `error`).
 *
 * @param props Props of the component, see {@link FileUploadProps}.
 * @param props.title Text shown while idle.
 * @param props.draggingTitle Text shown while a file is dragged over the zone.
 * @param props.hint Helper text shown under the main text.
 * @param props.accept File types the input accepts (same syntax as the HTML `accept` attribute).
 * @param props.name Name to show.
 * @param props.disabled Whether the control is disabled.
 * @param props.file Already uploaded file: replaces the drop zone with its name and a button to remove it.
 * @param props.error Validation error: takes priority over the idle state.
 * @param props.removeLabel Accessible name of the remove button.
 * @param props.onFileSelect Called with the chosen or dropped file. Validating size and type is up to the consumer.
 * @param props.onFileRemove Called when the user removes the uploaded file.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function FileUpload({
  title = "Drag a PDF or photo here, or browse",
  draggingTitle = "Drop to upload",
  hint = "PDF, JPG or PNG · up to 10 MB",
  accept,
  name,
  disabled,
  file,
  error,
  removeLabel,
  onFileSelect,
  onFileRemove,
  className,
  ...rest
}: FileUploadProps) {
  const drop = useFileDrop({ disabled, onFileSelect });
  const status = getUploadStatus({ file, error });
  const content = <FileUploadContent view={getUploadView({ file, error, hint })} title={title} draggingTitle={draggingTitle} />;

  return (
    <div
      {...rest}
      className={cx(styles.root, styles[status], disabled && styles.disabled, className)}
      data-dragging={drop.dragging || undefined}
      role={FILE_UPLOAD_ROLES[status]}
    >
      {status === UPLOADED_STATUS ? (
        <UploadedFile content={content} removeLabel={removeLabel} onFileRemove={onFileRemove} />
      ) : (
        <UploadDropzone name={name} accept={accept} disabled={disabled} onFileSelect={onFileSelect} content={content} drop={drop} />
      )}
    </div>
  );
}
