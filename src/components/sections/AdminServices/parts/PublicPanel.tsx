import { TextInput } from "@/components/ui/TextInput";
import { Textarea } from "@/components/ui/Textarea";

import { DESCRIPTION_LABEL, NAME_LABEL, PANEL_ID } from "../AdminServices.constants";
import type { PublicPanelProps } from "../AdminServices.types";
import styles from "../AdminServices.module.scss";

/**
 * Public page of a service: the name and the description clients read on the website.
 *
 * @param props Props of the component, see {@link PublicPanelProps}.
 * @param props.service Service shown.
 * @returns The rendered element.
 */
export function PublicPanel({ service }: PublicPanelProps) {
  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.panelBody}>
      <TextInput label={NAME_LABEL} defaultValue={service.name} />
      <Textarea label={DESCRIPTION_LABEL} defaultValue={`${service.name} at the clinic, ${service.duration} minutes.`} />
    </div>
  );
}
