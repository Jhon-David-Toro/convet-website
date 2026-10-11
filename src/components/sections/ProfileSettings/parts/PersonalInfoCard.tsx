"use client";

import { Button } from "@/components/ui/Button";

import { PERSONAL_TITLE, SAVE_LABEL, SAVED_LABEL } from "../ProfileSettings.constants";
import type { PersonalInfoCardProps } from "../ProfileSettings.types";
import { useProfileForm } from "../hooks/useProfileForm";
import { ContactFields } from "./ContactFields";
import { NameFields } from "./NameFields";
import styles from "../ProfileSettings.module.scss";

/**
 * Card with the personal information form: names, email, WhatsApp number, address and the save button.
 *
 * @param props Props of the component, see {@link PersonalInfoCardProps}.
 * @param props.profile Profile the form starts with.
 * @param props.onSave Receives the values of a valid form.
 * @returns The rendered element.
 */
export function PersonalInfoCard({ profile, onSave }: PersonalInfoCardProps) {
  const { handleSubmit, saved, ...fields } = useProfileForm({ initial: profile, onSave });

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.card} aria-labelledby="profile-personal">
      <h2 id="profile-personal" className={styles.cardTitle}>
        {PERSONAL_TITLE}
      </h2>
      <NameFields {...fields} />
      <ContactFields {...fields} />
      <div className={styles.save}>
        <Button type="submit">{SAVE_LABEL}</Button>
        {saved && (
          <span role="status" className={styles.saved}>
            {SAVED_LABEL}
          </span>
        )}
      </div>
    </form>
  );
}
