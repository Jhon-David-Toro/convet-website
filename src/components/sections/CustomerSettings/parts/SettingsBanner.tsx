import { Alert } from "@/components/ui/Alert";

import { ATTENTION_TEXT, SAVED_BANNER } from "../CustomerSettings.constants";
import type { SettingsBannerProps } from "../CustomerSettings.types";
import { attentionTitle } from "../CustomerSettings.utils";

/**
 * Banner at the top of the page after saving: a confirmation when it went through, or how many fields need attention when it did not.
 *
 * @param props Props of the component, see {@link SettingsBannerProps}.
 * @param props.status Result of the last save.
 * @param props.errorCount Number of invalid fields.
 * @returns The rendered element, or nothing before the first save.
 */
export function SettingsBanner({ status, errorCount }: SettingsBannerProps) {
  if (status === "saved") return <Alert tone="success" title={SAVED_BANNER} role="status" />;
  if (status === "error")
    return (
      <Alert tone="error" title={attentionTitle(errorCount)} role="alert">
        {ATTENTION_TEXT}
      </Alert>
    );
  return null;
}
