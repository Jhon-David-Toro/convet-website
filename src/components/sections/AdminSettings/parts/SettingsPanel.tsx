import type { SettingsPanelProps } from "../AdminSettings.types";
import { AuditPanel } from "./AuditPanel";
import { BookingRulesForm } from "./BookingRulesForm";
import { BusinessPanel } from "./BusinessPanel";
import { NotificationsPanel } from "./NotificationsPanel";

const PANELS = {
  booking: BookingRulesForm,
  notifications: NotificationsPanel,
  business: BusinessPanel,
  audit: AuditPanel,
};

/**
 * Content of the selected settings tab.
 *
 * @param props Props of the component, see {@link SettingsPanelProps}.
 * @param props.tab Selected tab.
 * @returns The rendered element.
 */
export function SettingsPanel({ tab }: SettingsPanelProps) {
  const Panel = PANELS[tab];

  return <Panel />;
}
