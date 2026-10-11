import { Button } from "@/components/ui/Button";

import { DISCARD_LABEL, PUBLISH_LABEL } from "../AdminServices.constants";
import type { RulesActionsProps } from "../AdminServices.types";
import styles from "../AdminServices.module.scss";

/**
 * Buttons under the booking rules of a service: go back to the saved values, or save and publish.
 *
 * @param props Props of the component, see {@link RulesActionsProps}.
 * @param props.discard Goes back to the saved values.
 * @param props.publish Saves and publishes the service.
 * @returns The rendered element.
 */
export function RulesActions({ discard, publish }: RulesActionsProps) {
  return (
    <div className={styles.actions}>
      <Button type="button" variant="tertiary" onClick={discard}>
        {DISCARD_LABEL}
      </Button>
      <Button type="button" onClick={publish}>
        {PUBLISH_LABEL}
      </Button>
    </div>
  );
}
