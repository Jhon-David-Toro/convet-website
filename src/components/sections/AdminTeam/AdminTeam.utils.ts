import type { TeamMember } from "@/lib/admin/admin.types";

import { PENDING_USER_ID, USER_ID_PREFIX } from "./AdminTeam.constants";

/**
 * Line under a member's name: their user ID, or that the invitation is pending.
 *
 * @param member Member of the team.
 * @returns The line to show.
 */
export function userIdLine(member: TeamMember): string {
  return member.status === "invited" ? `${USER_ID_PREFIX} — ${PENDING_USER_ID}` : `${USER_ID_PREFIX} ${member.userId}`;
}
