import { z } from "zod";

import { optionalText } from "./api.contract";
import { ROLES } from "@/lib/auth/auth.contract";
import { branchSchema } from "./branches.contract";

export const STAFF_POSITIONS = ["VETERINARIAN", "ASSISTANT", "RECEPTIONIST", "OTHER"] as const;

const staffUserSchema = z.object({ firstName: z.string(), lastName: z.string(), email: z.string(), mobileNumber: z.string(), role: z.enum(ROLES) });

/** Staff record without its user, as `POST /staff`, `PATCH /staff/:id` and the status endpoint send it. */
export const staffRecordSchema = z.object({
  idStaff: z.string(),
  userId: z.string(),
  staffNumber: z.string(),
  position: z.enum(STAFF_POSITIONS),
  specialty: optionalText,
  isActive: z.boolean(),
});

/** Staff member with the user's name and contact (`GET /staff`, `GET /staff/:id`). */
export const staffMemberSchema = staffRecordSchema.extend({ user: staffUserSchema });

/** Assignment of a staff member to a branch, as the assign and end endpoints send it. */
export const staffBranchSchema = z.object({
  idStaffBranch: z.string(),
  staffId: z.string(),
  branchId: z.string(),
  startDate: z.string(),
  endDate: optionalText,
  isActive: z.boolean(),
});

/** Branch of a staff member (`GET /staff/:staffId/branches`), ended ones included. */
export const staffBranchWithBranchSchema = staffBranchSchema.extend({ branch: branchSchema });

/** Staff member of a branch (`GET /branches/:branchId/staff`), every position and ended assignments included. */
export const branchStaffSchema = staffBranchSchema.extend({
  staff: staffRecordSchema.extend({ user: staffUserSchema.extend({ idUser: z.string() }) }),
});

export type StaffPosition = (typeof STAFF_POSITIONS)[number];

export type StaffMemberDto = z.infer<typeof staffMemberSchema>;

export type StaffRecordDto = z.infer<typeof staffRecordSchema>;

export type StaffBranchDto = z.infer<typeof staffBranchSchema>;

export type StaffBranchWithBranchDto = z.infer<typeof staffBranchWithBranchSchema>;

export type BranchStaffDto = z.infer<typeof branchStaffSchema>;

/** Body of `POST /staff`: the user must already have the STAFF or ADMIN role. */
export type CreateStaffDto = { userId: string; staffNumber: string; position: StaffPosition; specialty?: string };

/** Body of `PATCH /staff/:id`: at least one field. */
export type UpdateStaffDto = Partial<Omit<CreateStaffDto, "userId">>;

export const STAFF_ENDPOINTS = {
  list: "/staff",
  detail: (idStaff: string) => `/staff/${encodeURIComponent(idStaff)}`,
  status: (idStaff: string) => `/staff/${encodeURIComponent(idStaff)}/status`,
  branches: (idStaff: string) => `/staff/${encodeURIComponent(idStaff)}/branches`,
  endBranch: (idStaff: string, idStaffBranch: string) => `/staff/${encodeURIComponent(idStaff)}/branches/${encodeURIComponent(idStaffBranch)}/end`,
  ofBranch: (idBranch: string) => `/branches/${encodeURIComponent(idBranch)}/staff`,
} as const;
