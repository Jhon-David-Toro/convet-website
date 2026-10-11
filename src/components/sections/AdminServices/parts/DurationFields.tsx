import { Select } from "@/components/ui/Select";

import styles from "../AdminServices.module.scss";
import { BUFFER_LABEL, BUFFER_OPTIONS, DURATION_LABEL, DURATION_OPTIONS } from "../AdminServices.constants";
import type { DraftFieldsProps } from "../AdminServices.types";

/**
 * Duration of the service and the buffer left after it.
 *
 * @param props Props of the component, see {@link DraftFieldsProps}.
 * @param props.draft Values being edited.
 * @param props.setField Changes one value.
 * @returns The rendered element.
 */
export function DurationFields({ draft, setField }: DraftFieldsProps) {
  return (
    <div className={styles.pair}>
      <Select label={DURATION_LABEL} options={DURATION_OPTIONS} value={draft.duration} onValueChange={(value) => setField("duration", value)} />
      <Select label={BUFFER_LABEL} options={BUFFER_OPTIONS} value={draft.buffer} onValueChange={(value) => setField("buffer", value)} />
    </div>
  );
}
