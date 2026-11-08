import type { TeamMember, TeamRole } from "@/lib/admin/admin.types";

import type { StaffBranchWithBranchDto, StaffMemberDto, StaffPosition } from "./staff.contract";

const POSITION_LABELS: Record<StaffPosition, string> = {
  VETERINARIAN: "Veterinarian",
  ASSISTANT: "Vet assistant",
  RECEPTIONIST: "Receptionist",
  OTHER: "Staff",
};

const NO_LOCATION = "No location";

const USER_ID_LENGTH = 4;

/**
 * Role of the team table for a staff member: vets by position, admins by account role, everyone else as assistant.
 *
 * @param member Staff member as the backend sends it.
 * @returns The role to show.
 */
export function teamRole(member: StaffMemberDto): TeamRole {
  if (member.position === "VETERINARIAN") return "veterinarian";
  return member.user.role === "ADMIN" ? "administrator" : "assistant";
}

/**
 * Names of the branches a staff member works at now.
 *
 * @param branches Assignments of the member; ended ones are skipped.
 * @returns The branch names, or "No location".
 */
export function locationLabel(branches: StaffBranchWithBranchDto[] | undefined): string {
  const names = (branches ?? []).filter((assignment) => assignment.isActive).map((assignment) => assignment.branch.name);
  return names.length > 0 ? names.join(", ") : NO_LOCATION;
}

/**
 * Turns a staff member into a row of the team table. Two-step verification is not in the backend, so it shows as unknown.
 *
 * @param member Staff member with their user.
 * @param branches Branch assignments of the member, when they could be loaded.
 * @returns The row.
 */
export function toTeamMember(member: StaffMemberDto, branches?: StaffBranchWithBranchDto[]): TeamMember {
  return {
    id: member.idStaff,
    name: `${member.user.firstName} ${member.user.lastName}`,
    userId: `USR-${member.userId.slice(0, USER_ID_LENGTH)}`,
    staffId: member.staffNumber,
    role: teamRole(member),
    clinicalNo: member.specialty ?? "–",
    clinicalLabel: POSITION_LABELS[member.position],
    location: locationLabel(branches),
    twoStep: "none",
    status: member.isActive ? "active" : "inactive",
  };
}
