import styles from "../Modal.module.scss";
import type { ModalHeadingProps } from "../Modal.types";

/**
 * Title with an optional description.
 *
 * @param props Props of the component, see {@link ModalHeadingProps}.
 * @param props.title Title text.
 * @param props.description Description text under the title.
 * @param props.titleId Id of the title element, referenced by `aria-labelledby`.
 * @param props.descriptionId Id of the description element, referenced by `aria-describedby`.
 * @returns The rendered element.
 */
export function ModalHeading({ title, description, titleId, descriptionId }: ModalHeadingProps) {
  return (
    <div className={styles.heading}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {description && (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      )}
    </div>
  );
}
