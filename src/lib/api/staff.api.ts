import "server-only";

import { cache } from "react";

import { apiRequest } from "./api.client";
import { collection } from "./api.contract";
import type { TeamMember } from "@/lib/admin/admin.types";

import { toTeamMember } from "./staff.mappers";
import { STAFF_ENDPOINTS, branchStaffSchema, staffBranchSchema, staffBranchWithBranchSchema, staffMemberSchema, staffRecordSchema } from "./staff.contract";
import type {
  BranchStaffDto,
  CreateStaffDto,
  StaffBranchDto,
  StaffBranchWithBranchDto,
  StaffMemberDto,
  StaffRecordDto,
  UpdateStaffDto,
} from "./staff.contract";

/**
 * Every staff member, active or not, newest first (admin). Cached for the length of a request.
 *
 * @returns The staff members with their user.
 * @throws {ApiError} `forbidden` for non-admins.
 */
export const getStaffMembers = cache(async (): Promise<StaffMemberDto[]> => apiRequest(STAFF_ENDPOINTS.list, { schema: collection(staffMemberSchema) }));

/**
 * One staff member (admin).
 *
 * @param idStaff Id of the staff record.
 * @returns The staff member with their user.
 */
export async function getStaffMember(idStaff: string): Promise<StaffMemberDto> {
  return apiRequest(STAFF_ENDPOINTS.detail(idStaff), { schema: staffMemberSchema });
}

/**
 * Creates the staff record of a user who already has the STAFF or ADMIN role (admin).
 *
 * @param dto User, staff number, position and specialty.
 * @returns The staff record.
 * @throws {ApiError} `validation` for a customer account; `conflict` when the user or the number already has a record.
 */
export async function createStaffMember(dto: CreateStaffDto): Promise<StaffRecordDto> {
  return apiRequest(STAFF_ENDPOINTS.list, { method: "POST", body: dto, schema: staffRecordSchema });
}

/**
 * Changes the staff number, position or specialty (admin).
 *
 * @param idStaff Id of the staff record.
 * @param dto Fields to change, at least one.
 * @returns The updated record.
 * @throws {ApiError} `conflict` when the staff number is taken.
 */
export async function updateStaffMember(idStaff: string, dto: UpdateStaffDto): Promise<StaffRecordDto> {
  return apiRequest(STAFF_ENDPOINTS.detail(idStaff), { method: "PATCH", body: dto, schema: staffRecordSchema });
}

/**
 * Activates or deactivates a staff member (admin).
 *
 * @param idStaff Id of the staff record.
 * @param isActive Whether the member works at the clinic.
 * @returns The updated record.
 */
export async function setStaffMemberActive(idStaff: string, isActive: boolean): Promise<StaffRecordDto> {
  return apiRequest(STAFF_ENDPOINTS.status(idStaff), { method: "PATCH", body: { isActive }, schema: staffRecordSchema });
}

/**
 * Branches a staff member works or worked at, newest first (admin). Cached for the length of a request.
 *
 * @param idStaff Id of the staff record.
 * @returns The assignments with their branch.
 */
export const getStaffBranches = cache(async (idStaff: string): Promise<StaffBranchWithBranchDto[]> =>
  apiRequest(STAFF_ENDPOINTS.branches(idStaff), { schema: collection(staffBranchWithBranchSchema) }),
);

/**
 * Staff of a branch, every position, ended assignments included (admin).
 *
 * @param idBranch Id of the branch.
 * @returns The assignments with the staff member and user.
 */
export async function getBranchStaff(idBranch: string): Promise<BranchStaffDto[]> {
  return apiRequest(STAFF_ENDPOINTS.ofBranch(idBranch), { schema: collection(branchStaffSchema) });
}

/**
 * Bookable vets of a branch: active assignments of active veterinarians.
 *
 * @param idBranch Id of the branch.
 * @returns The assignments of the vets.
 */
export async function getBranchVets(idBranch: string): Promise<BranchStaffDto[]> {
  return (await getBranchStaff(idBranch)).filter(({ isActive, staff }) => isActive && staff.isActive && staff.position === "VETERINARIAN");
}

/**
 * Assigns a staff member to a branch from today (admin).
 *
 * @param idStaff Id of the staff record.
 * @param branchId Id of the branch.
 * @returns The assignment.
 * @throws {ApiError} `conflict` when the member is already assigned there.
 */
export async function assignStaffToBranch(idStaff: string, branchId: string): Promise<StaffBranchDto> {
  return apiRequest(STAFF_ENDPOINTS.branches(idStaff), { method: "POST", body: { branchId }, schema: staffBranchSchema });
}

/**
 * Ends the assignment of a staff member to a branch (admin).
 *
 * @param idStaff Id of the staff record.
 * @param idStaffBranch Id of the assignment.
 * @param endDate Last day, ISO; by default now.
 * @returns The ended assignment.
 */
export async function endStaffBranch(idStaff: string, idStaffBranch: string, endDate?: string): Promise<StaffBranchDto> {
  return apiRequest(STAFF_ENDPOINTS.endBranch(idStaff, idStaffBranch), { method: "PATCH", body: endDate ? { endDate } : {}, schema: staffBranchSchema });
}

/**
 * Rows of the team table: every staff member with the branches they work at. A member whose branches cannot be read still shows,
 * without location.
 *
 * @returns The team, newest first.
 * @throws {ApiError} When the staff list itself fails.
 */
export async function getTeam(): Promise<TeamMember[]> {
  const members = await getStaffMembers();
  const branches = await Promise.allSettled(members.map((member) => getStaffBranches(member.idStaff)));
  return members.map((member, index) => {
    const result = branches[index];
    return toTeamMember(member, result.status === "fulfilled" ? result.value : undefined);
  });
}
