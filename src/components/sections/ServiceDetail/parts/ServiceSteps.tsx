import { STEPS_TITLE } from "../ServiceDetail.constants";
import type { ServiceStepsProps } from "../ServiceDetail.types";
import { ServiceStepItem } from "./ServiceStepItem";
import styles from "../ServiceDetail.module.scss";

/**
 * "What to expect": the numbered steps of a visit.
 *
 * @param props Props of the component, see {@link ServiceStepsProps}.
 * @param props.steps Steps of the service, in order.
 * @returns The rendered element.
 */
export function ServiceSteps({ steps }: ServiceStepsProps) {
  return (
    <section className={styles.block}>
      <h2 className={styles.blockTitle}>{STEPS_TITLE}</h2>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <ServiceStepItem key={step.title} position={index + 1} step={step} />
        ))}
      </ol>
    </section>
  );
}
