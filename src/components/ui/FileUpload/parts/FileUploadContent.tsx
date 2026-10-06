import { Icon } from "@/components/ui/Icon";

import styles from "../FileUpload.module.scss";
import { FILE_UPLOAD_ICON_SIZE } from "../FileUpload.constants";
import type { FileUploadContentProps } from "../FileUpload.types";

/**
 * Icon and texts of the upload zone. Without a heading it shows the idle and dragging titles.
 *
 * @param props Props of the component, see {@link FileUploadContentProps}.
 * @param props.view How the status is presented.
 * @param props.title Title text.
 * @param props.draggingTitle Text shown while a file is dragged over the zone.
 * @returns The rendered element.
 */
export function FileUploadContent({ view, title, draggingTitle }: FileUploadContentProps) {
  const { glyph, heading, detail } = view;

  return (
    <>
      <span className={styles.wrap}>
        <Icon icon={glyph} size={FILE_UPLOAD_ICON_SIZE} />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>
          {heading ?? (
            <>
              <span className={styles.idleTitle}>{title}</span>
              <span className={styles.draggingTitle}>{draggingTitle}</span>
            </>
          )}
        </span>
        {detail && <span className={styles.hint}>{detail}</span>}
      </span>
    </>
  );
}
