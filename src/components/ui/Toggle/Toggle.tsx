import { useId } from "react";

import { ChoiceText } from "@/components/ui/ChoiceText";
import { cx } from "@/lib/shared/cx";

import type { ToggleProps } from "./Toggle.types";
import styles from "./Toggle.module.scss";

/**
 * Switch with a label and an optional description.
 *
 * @param props Props of the component, see {@link ToggleProps}.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.description Description text under the title.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Toggle({ label, description, className, ...rest }: ToggleProps) {
  const descriptionId = useId();

  return (
    <label className={cx(styles.root, className)}>
      <input {...rest} type="checkbox" role="switch" className={styles.input} aria-describedby={description ? descriptionId : undefined} />
      <span className={styles.control} aria-hidden="true">
        <span className={styles.knob} />
      </span>
      <ChoiceText label={label} description={description} descriptionId={descriptionId} />
    </label>
  );
}
