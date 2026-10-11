import type { ProfileSettingsProps } from "./ProfileSettings.types";
import { NotificationsCard } from "./parts/NotificationsCard";
import { PersonalInfoCard } from "./parts/PersonalInfoCard";
import { ProfileHeading } from "./parts/ProfileHeading";
import { SecurityCard } from "./parts/SecurityCard";
import styles from "./ProfileSettings.module.scss";

/**
 * Profile and settings page: personal information on the left; notifications and security on the right (below it on small screens).
 *
 * @param props Props of the component, see {@link ProfileSettingsProps}.
 * @param props.profile Profile of the customer.
 * @param props.notifications Notification settings of the customer.
 * @param props.onSave Receives the personal information of a valid form.
 * @returns The rendered element.
 */
export function ProfileSettings({ profile, notifications, onSave }: ProfileSettingsProps) {
  return (
    <div className={styles.page}>
      <ProfileHeading />
      <div className={styles.columns}>
        <PersonalInfoCard profile={profile} onSave={onSave} />
        <div className={styles.side}>
          <NotificationsCard settings={notifications} />
          <SecurityCard />
        </div>
      </div>
    </div>
  );
}
