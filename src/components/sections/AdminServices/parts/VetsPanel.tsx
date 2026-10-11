import { Checkbox } from "@/components/ui/Checkbox";

import { PANEL_ID, VET_NAMES, VETS_LABEL } from "../AdminServices.constants";
import type { VetsPanelProps } from "../AdminServices.types";
import styles from "../AdminServices.module.scss";

/**
 * Vets who provide a service: a checkbox per vet, the first ones checked as many as the service has.
 *
 * @param props Props of the component, see {@link VetsPanelProps}.
 * @param props.service Service shown.
 * @returns The rendered element.
 */
export function VetsPanel({ service }: VetsPanelProps) {
  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.panelBody}>
      <fieldset className={styles.vets} aria-label={VETS_LABEL}>
        {VET_NAMES.map((name, index) => (
          <Checkbox key={name} label={name} defaultChecked={index < service.vets} />
        ))}
      </fieldset>
    </div>
  );
}
