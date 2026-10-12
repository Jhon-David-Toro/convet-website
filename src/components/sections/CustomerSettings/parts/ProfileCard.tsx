import { Button } from "@/components/ui/Button";
import { AlertTriangle, CheckCircle, Icon } from "@/components/ui/Icon";
import { TextInput } from "@/components/ui/TextInput";
import { cx } from "@/lib/shared/cx";

import {
  ADDRESS_PLACEHOLDER,
  DISCARD_LABEL,
  PHONE_HELPER,
  PHONE_LABEL,
  PROFILE_TITLE,
  SAVE_LABEL,
  SAVED_STATUS,
} from "../CustomerSettings.constants";
import type { ProfileCardProps } from "../CustomerSettings.types";
import { notSavedStatus } from "../CustomerSettings.utils";
import styles from "../CustomerSettings.module.scss";

/**
 * Card with the profile form: names, WhatsApp number and optional address, its save status and the save and discard buttons.
 *
 * @param props Props of the component, see {@link ProfileCardProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.status Result of the last save.
 * @param props.setValue Changes one value and clears its error.
 * @param props.save Validates and saves the form.
 * @param props.discard Goes back to the saved values.
 * @returns The rendered element.
 */
export function ProfileCard({ values, errors, status, setValue, save, discard }: ProfileCardProps) {
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form
      noValidate
      className={styles.card}
      aria-labelledby="settings-profile"
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      <div className={styles.cardHead}>
        <h2 id="settings-profile" className={styles.cardTitle}>
          {PROFILE_TITLE}
        </h2>
        {status !== "idle" && (
          <span className={cx(styles.status, status === "error" && styles.statusError)}>
            <Icon icon={status === "error" ? AlertTriangle : CheckCircle} size="small" />
            {status === "error" ? notSavedStatus(errorCount) : SAVED_STATUS}
          </span>
        )}
      </div>
      <div className={styles.names}>
        <TextInput label="First name" autoComplete="given-name" value={values.firstName} onChange={(event) => setValue("firstName", event.target.value)} />
        <TextInput label="Last name" autoComplete="family-name" value={values.lastName} onChange={(event) => setValue("lastName", event.target.value)} />
      </div>
      <TextInput label={PHONE_LABEL} type="tel" autoComplete="tel" helper={PHONE_HELPER} error={errors.phone} value={values.phone} onChange={(event) => setValue("phone", event.target.value)} />
      <TextInput label="Address" optional autoComplete="street-address" placeholder={ADDRESS_PLACEHOLDER} error={errors.address} value={values.address} onChange={(event) => setValue("address", event.target.value)} />
      <div className={styles.actions}>
        <Button type="submit">{SAVE_LABEL}</Button>
        {status === "error" && (
          <Button type="button" variant="tertiary" onClick={discard}>
            {DISCARD_LABEL}
          </Button>
        )}
      </div>
    </form>
  );
}
