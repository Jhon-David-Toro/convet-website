import type { BookingRules } from "@/lib/admin.types";

export type SettingsTab = "booking" | "notifications" | "business" | "audit";

export type SettingsTabsProps = {
  tab: SettingsTab;
  onChange: (tab: SettingsTab) => void;
};

export type SettingsPanelProps = {
  tab: SettingsTab;
};

export type RuleSelectKey = "notice" | "horizon" | "rescheduleWindow" | "maxUpcoming" | "slotInterval" | "maxPerSlot";

export type RuleToggleKey = "autoConfirm" | "chooseVet";

export type RulesState = {
  rules: BookingRules;
  setRule: <Key extends keyof BookingRules>(key: Key, value: BookingRules[Key]) => void;
  discard: () => void;
  save: () => void;
};

export type RulesFormProps = Pick<RulesState, "rules" | "setRule">;

export type RuleActionsProps = Pick<RulesState, "discard" | "save">;

export type ToggleListState = {
  values: Record<string, boolean>;
  toggle: (key: string) => void;
};
