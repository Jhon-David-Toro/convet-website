import type { TeamMember, WorkingDay } from "@/lib/admin/admin.types";
import type { ServerAction } from "@/lib/shared/useActionToast.types";

export type TeamActions = {
  setActive?: ServerAction<[idStaff: string, isActive: boolean], void>;
};

export type AdminTeamProps = {
  members?: TeamMember[];
  loadError?: string;
  actions?: TeamActions;
};

export type MemberRowProps = {
  member: TeamMember;
  actions?: TeamActions;
};

export type MemberCellsProps = Pick<MemberRowProps, "member">;

export type DayTileProps = {
  day: WorkingDay;
};
