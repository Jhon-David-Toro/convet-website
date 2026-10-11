"use client";

import { useState } from "react";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";

import { SUBTITLE, TITLE } from "./AdminSettings.constants";
import type { SettingsTab } from "./AdminSettings.types";
import { SettingsPanel } from "./parts/SettingsPanel";
import { SettingsTabs } from "./parts/SettingsTabs";

/**
 * Settings page of the admin area: tabs for the booking rules, the notifications, the business info and the audit log.
 *
 * @returns The rendered element.
 */
export function AdminSettings() {
  const [tab, setTab] = useState<SettingsTab>("booking");

  return (
    <PageStack>
      <PageHeader title={TITLE} subtitle={SUBTITLE} />
      <SettingsTabs tab={tab} onChange={setTab} />
      <SettingsPanel tab={tab} />
    </PageStack>
  );
}
