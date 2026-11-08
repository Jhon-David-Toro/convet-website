import { describe, expect, it } from "vitest";

import { collection } from "./api.contract";
import { staffBranchWithBranchSchema, staffMemberSchema } from "./staff.contract";
import { locationLabel, toTeamMember } from "./staff.mappers";

const MEMBER = {
  idStaff: "st1",
  userId: "abcd1234-0000",
  staffNumber: "STF-0001",
  position: "VETERINARIAN",
  specialty: null,
  isActive: true,
  createdAt: "2026-11-01T00:00:00.000Z",
  user: { firstName: "Shirley", lastName: "Croes", email: "s@convet.aw", mobileNumber: "+2975930404", role: "STAFF" },
};

const BRANCH = { idBranch: "b1", name: "Oranjestad", slug: "oranjestad", address: "Main 1", city: "Oranjestad", department: "Aruba", phone: null, email: null, isActive: true, timeZone: "America/Aruba" };

const assignment = (isActive: boolean) => ({ idStaffBranch: `sb-${isActive}`, staffId: "st1", branchId: "b1", startDate: "2026-01-01", endDate: null, isActive, branch: BRANCH });

describe("toTeamMember", () => {
  it("builds the row of the team table", () => {
    const branches = collection(staffBranchWithBranchSchema).parse([assignment(true), assignment(false)]);
    expect(toTeamMember(staffMemberSchema.parse(MEMBER), branches)).toEqual({
      id: "st1",
      name: "Shirley Croes",
      userId: "USR-abcd",
      staffId: "STF-0001",
      role: "veterinarian",
      clinicalNo: "–",
      clinicalLabel: "Veterinarian",
      location: "Oranjestad",
      twoStep: "none",
      status: "active",
    });
  });

  it("marks admins and inactive members", () => {
    const member = staffMemberSchema.parse({ ...MEMBER, position: "OTHER", isActive: false, user: { ...MEMBER.user, role: "ADMIN" } });
    expect(toTeamMember(member)).toMatchObject({ role: "administrator", status: "inactive", location: "No location" });
  });
});

describe("locationLabel", () => {
  it("skips ended assignments", () => {
    expect(locationLabel(collection(staffBranchWithBranchSchema).parse([assignment(false)]))).toBe("No location");
  });
});
