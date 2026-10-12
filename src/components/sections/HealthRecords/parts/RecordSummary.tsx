import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, Syringe } from "@/components/ui/Icon";

import { RABIES_BADGE } from "../HealthRecords.constants";
import type { RecordProps } from "../HealthRecords.types";
import styles from "../HealthRecords.module.scss";

/**
 * Card of the pet at the top of the records: avatar, name, vaccination badge, description, allergy and, when there are records, its microchip, weight and primary vet.
 *
 * @param props Props of the component, see {@link RecordProps}.
 * @param props.pet Pet on screen.
 * @param props.record Health record of the pet.
 * @returns The rendered element.
 */
export function RecordSummary({ pet, record }: RecordProps) {
  const facts = [
    { label: "Microchip", value: pet.microchip, mono: true },
    { label: "Weight", value: record.weightLabel },
    { label: "Primary vet", value: record.primaryVet },
  ];

  return (
    <section className={styles.summary} aria-label={pet.name}>
      <Avatar subject={pet.subject} size="large" className={styles.avatar} />
      <div className={styles.identity}>
        <div className={styles.nameRow}>
          <h2 className={styles.name}>{pet.name}</h2>
          {pet.vaccineStatus === "due-soon" && (
            <Badge tone="warning" icon={Syringe}>
              {RABIES_BADGE}
            </Badge>
          )}
        </div>
        <p className={styles.description}>{record.description}</p>
        <p className={styles.born}>{record.born}</p>
        {pet.allergy && (
          <Badge tone="error" icon={AlertTriangle}>
            {pet.allergy}
          </Badge>
        )}
      </div>
      {record.events.length > 0 && (
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd className={fact.mono ? styles.mono : undefined}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
