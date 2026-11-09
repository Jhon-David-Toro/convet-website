"use client";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import type { CustomerSettingsProps } from "./CustomerSettings.types";

import { SUBTITLE, TITLE } from "./CustomerSettings.constants";
import { useCustomerSettings } from "./hooks/useCustomerSettings";
import { CommunicationCard } from "./parts/CommunicationCard";
import { NotificationsCard } from "./parts/NotificationsCard";
import { PrivacyCard } from "./parts/PrivacyCard";
import { ProfileCard } from "./parts/ProfileCard";
import { SecurityCard } from "./parts/SecurityCard";
import { SessionsCard } from "./parts/SessionsCard";
import { SettingsBanner } from "./parts/SettingsBanner";
import styles from "./CustomerSettings.module.scss";

/**
 * Settings page of the customer area: profile and contact, sign-in and security, communication preferences on the left;
 * notifications, active sessions and privacy on the right (below on small screens). Saving shows a banner with the result.
 *
 * @param props Props of the component, see {@link CustomerSettingsProps}.
 * @param props.onChangePassword Saves a new password through the backend.
 * @returns The rendered element.
 */
export function CustomerSettings({ onChangePassword }: CustomerSettingsProps) {
  const settings = useCustomerSettings();
  const errorCount = Object.values(settings.errors).filter(Boolean).length;

  return (
    <PageStack>
      <PageHeader title={TITLE} subtitle={SUBTITLE} />
      <SettingsBanner status={settings.status} errorCount={errorCount} />
      <div className={styles.columns}>
        <div className={styles.column}>
          <ProfileCard
            values={settings.values}
            errors={settings.errors}
            status={settings.status}
            setValue={settings.setValue}
            save={settings.save}
            discard={settings.discard}
          />
          <SecurityCard onChangePassword={onChangePassword} />
          <CommunicationCard />
        </div>
        <div className={styles.column}>
          <NotificationsCard notifications={settings.notifications} toggleNotification={settings.toggleNotification} toggleChannel={settings.toggleChannel} />
          <SessionsCard sessions={settings.sessions} signOutSession={settings.signOutSession} signOutOthers={settings.signOutOthers} />
          <PrivacyCard />
        </div>
      </div>
    </PageStack>
  );
}
