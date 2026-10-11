import type { TeamMember, WorkingDay } from "@/lib/admin/admin.types";

export type MemberRowProps = {
  member: TeamMember;
};

export type MemberCellsProps = MemberRowProps;

export type DayTileProps = {
  day: WorkingDay;
};
