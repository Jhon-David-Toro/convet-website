import type { ChangeEvent } from "react";

import type { UploadDropzoneProps } from "../FileUpload.types";
import styles from "../FileUpload.module.scss";

/**
 * Dashed border plus the clickable / droppable label that wraps the native file input.
 *
 * @param props Props of the component, see {@link UploadDropzoneProps}.
 * @param props.name Name to show.
 * @param props.accept File types the input accepts (same syntax as the HTML `accept` attribute).
 * @param props.disabled Whether the control is disabled.
 * @param props.onFileSelect Called with the chosen or dropped file. Validating size and type is up to the consumer.
 * @param props.content Prepared content to render.
 * @param props.drop Drag and drop state and handlers.
 * @returns The rendered element.
 */
export function UploadDropzone({ name, accept, disabled, onFileSelect, content, drop }: UploadDropzoneProps) {
  /**
   * Reports the chosen file and clears the input so the same file can be picked again.
   *
   * @param event Change event of the file input.
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const chosen = event.target.files?.[0];
    if (chosen) onFileSelect?.(chosen);
    event.target.value = "";
  };

  return (
    <>
      <svg className={styles.dash} aria-hidden="true">
        <rect className={styles.dashRect} rx="15.25" />
      </svg>
      <label className={styles.content} onDragOver={drop.onDragOver} onDragLeave={drop.onDragLeave} onDrop={drop.onDrop}>
        <input type="file" name={name} accept={accept} disabled={disabled} className={styles.input} onChange={handleChange} />
        {content}
      </label>
    </>
  );
}
