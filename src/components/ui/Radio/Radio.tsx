import { useId } from "react";

import { ChoiceText } from "@/components/ui/ChoiceText";
import { cx } from "@/lib/shared/cx";

import type { RadioProps } from "./Radio.types";
import styles from "./Radio.module.scss";

/**
 * Radio button with a label and an optional description.
 *
 * @param props Props of the component, see {@link RadioProps}.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.description Description text under the title.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Radio({ label, description, className, ...rest }: RadioProps) {
  const descriptionId = useId();

  return (
    <label className={cx(styles.root, className)}>
      <input {...rest} type="radio" className={styles.input} aria-describedby={description ? descriptionId : undefined} />
      <span className={styles.control} aria-hidden="true" />
      <ChoiceText label={label} description={description} descriptionId={descriptionId} />
    </label>
  );
}
