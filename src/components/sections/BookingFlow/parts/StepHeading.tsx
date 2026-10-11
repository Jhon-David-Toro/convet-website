import type { StepHeadingProps } from "../BookingFlow.types";
import styles from "../BookingFlow.module.scss";

/**
 * Title of a booking step (the only `h1` of the page) and the sentence under it.
 *
 * @param props Props of the component, see {@link StepHeadingProps}.
 * @param props.title Title of the step.
 * @param props.subtitle Sentence under the title.
 * @returns The rendered element.
 */
export function StepHeading({ title, subtitle }: StepHeadingProps) {
  return (
    <div className={styles.heading}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
