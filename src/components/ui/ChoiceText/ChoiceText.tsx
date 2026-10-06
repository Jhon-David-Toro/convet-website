import styles from "./ChoiceText.module.scss";
import type { ChoiceTextProps } from "./ChoiceText.types";

/**
 * Label with an optional description, placed next to the control of a Checkbox, Radio or Toggle.
 *
 * @param props Props of the component, see {@link ChoiceTextProps}.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.description Description text under the title.
 * @param props.descriptionId Id of the description element, referenced by the input through `aria-describedby`.
 * @returns The rendered element.
 */
export function ChoiceText({ label, description, descriptionId }: ChoiceTextProps) {
  return (
    <span className={styles.text}>
      <span className={styles.label}>{label}</span>
      {description && (
        <span id={descriptionId} className={styles.description}>
          {description}
        </span>
      )}
    </span>
  );
}
