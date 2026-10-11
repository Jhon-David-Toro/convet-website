import { PetCard } from "@/components/patterns/PetCard";
import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { STAFF_PATIENTS_HREF } from "@/lib/staff.paths.constants";

import { ADD_PET_LABEL, PETS_TITLE, VACCINE_ICONS } from "../ClientDetail.constants";
import styles from "../ClientDetail.module.scss";
import type { ClientPetsProps } from "../ClientDetail.types";

/**
 * Pets of the client as rows with their vaccine status, each linking to the patient record, and the button that adds a pet.
 *
 * @param props Props of the component, see {@link ClientPetsProps}.
 * @param props.pets Pets of the client.
 * @returns The rendered element.
 */
export function ClientPets({ pets }: ClientPetsProps) {
  return (
    <section className={styles.column} aria-labelledby="client-pets">
      <h2 id="client-pets" className={styles.sectionTitle}>
        {PETS_TITLE}
      </h2>
      {pets.map(({ id, species, name, description, allergy, vaccine }) => (
        <PetCard
          key={id}
          layout="row"
          subject={species}
          name={name}
          description={description}
          alert={allergy ? "Allergic to penicillin" : undefined}
          vaccineStatus={{ tone: vaccine.tone, label: vaccine.label, icon: VACCINE_ICONS[vaccine.tone] }}
          href={`${STAFF_PATIENTS_HREF}/${id}`}
        />
      ))}
      <Button type="button" variant="tertiary" size="small" leadingIcon={Plus} className={styles.addPet}>
        {ADD_PET_LABEL}
      </Button>
    </section>
  );
}
