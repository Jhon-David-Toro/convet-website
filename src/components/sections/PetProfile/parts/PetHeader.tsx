"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Edit } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { useToast } from "@/components/ui/Toast";

import { EDIT_LABEL, EDIT_PET_MESSAGE } from "../PetProfile.constants";
import type { PetProps } from "../PetProfile.types";
import { PetFacts } from "./PetFacts";
import { PetIdentity } from "./PetIdentity";
import styles from "../PetProfile.module.scss";

/**
 * Header of the pet profile on desktop: avatar, identity, facts and the edit button.
 *
 * @param props Props of the component, see {@link PetProps}.
 * @param props.pet Pet to describe.
 * @returns The rendered element.
 */
export function PetHeader({ pet }: PetProps) {
  const { toast } = useToast();

  return (
    <section className={styles.header}>
      <Avatar subject={pet.subject} size="large" className={styles.avatar} />
      <PetIdentity pet={pet} />
      <PetFacts pet={pet} />
      <IconButton variant="outline" icon={Edit} label={EDIT_LABEL} onClick={() => toast({ message: EDIT_PET_MESSAGE, tone: "info" })} />
    </section>
  );
}
