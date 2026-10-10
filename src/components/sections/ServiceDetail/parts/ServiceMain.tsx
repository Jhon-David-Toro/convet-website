import styles from "../ServiceDetail.module.scss";
import type { ServiceMainProps } from "../ServiceDetail.types";
import { ServiceIntro } from "./ServiceIntro";
import { ServiceSteps } from "./ServiceSteps";
import { ServiceTable } from "./ServiceTable";

/**
 * Main column of a service page: intro, what to expect and, when the service has one, its reference table.
 *
 * @param props Props of the component, see {@link ServiceMainProps}.
 * @param props.service Service to describe.
 * @returns The rendered element.
 */
export function ServiceMain({ service }: ServiceMainProps) {
  return (
    <div className={styles.main}>
      <ServiceIntro service={service} />
      <ServiceSteps steps={service.steps} />
      {service.table && <ServiceTable table={service.table} />}
    </div>
  );
}
