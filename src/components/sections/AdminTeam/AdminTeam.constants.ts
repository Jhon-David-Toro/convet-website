import type { StatusView } from "@/components/patterns/StatusBadge";
import { AlertTriangle, Minus, Settings, Shield, Stethoscope, Users, Mail } from "@/components/ui/Icon";
import type { TeamMember, TeamRole, TeamStatus } from "@/lib/admin.types";

export const TITLE = "Team";

export const SUBTITLE = "Staff accounts are created by invitation only.";

export const INVITE_LABEL = "Invite team member";

export const TABLE_LABEL = "Team";

export const COLUMNS = ["Name · User ID", "Staff ID", "Role", "Clinical no.", "Location", "2-step", "Status"];

export const IDENTIFIERS_TITLE = "Four separate identifiers";

export const IDENTIFIERS_TEXT =
  "User ID (USR-) = login account · Staff ID (STF-) = employment record, one per team member · Vet number (VET-) and Assistant number (AST-) = clinical identifiers printed on records and prescriptions. Names are never used as identifiers.";

export const ROLE_VIEWS: Record<TeamRole, StatusView> = {
  veterinarian: { tone: "info", icon: Stethoscope, label: "Veterinarian" },
  administrator: { tone: "accent", icon: Settings, label: "Administrator" },
  assistant: { tone: "info", icon: Users, label: "Vet assistant" },
};

export const TWO_STEP_VIEWS: Record<TeamMember["twoStep"], StatusView> = {
  on: { tone: "success", icon: Shield, label: "On" },
  "not-set-up": { tone: "warning", icon: AlertTriangle, label: "Not set up" },
  none: { tone: "neutral", icon: Minus, label: "—" },
};

export const STATUS_VIEWS: Record<TeamStatus, StatusView> = {
  active: { tone: "success", label: "Active" },
  invited: { tone: "warning", icon: Mail, label: "Invited" },
};

export const USER_ID_PREFIX = "User ID";

export const PENDING_USER_ID = "(invite pending)";

export const ADD_TIME_OFF_LABEL = "Add time off";

export const TIME_OFF_TITLE = "Time off Oct 12–16 affects 4 appointments";

export const TIME_OFF_TEXT = "Reschedule them or assign another vet before saving.";

export const TIME_OFF_ACTION = "Review 4 appointments";

export const HOURS_TITLE_PREFIX = "Working hours";
