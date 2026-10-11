import { StackedCell } from "@/components/patterns/StackedCell";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { TableCell } from "@/components/patterns/Table";

import { ROLE_VIEWS } from "../AdminTeam.constants";
import type { MemberCellsProps } from "../AdminTeam.types";
import { userIdLine } from "../AdminTeam.utils";

/**
 * First cells of a team row: the name with the user ID, the staff ID and the role.
 *
 * @param props Props of the component, see {@link MemberCellsProps}.
 * @param props.member Member of the row.
 * @returns The rendered element.
 */
export function MemberIdentityCells({ member }: MemberCellsProps) {
  return (
    <>
      <TableCell>
        <StackedCell primary={member.name} secondary={userIdLine(member)} />
      </TableCell>
      <TableCell type="mono">{member.staffId}</TableCell>
      <TableCell type="badge">
        <StatusBadge view={ROLE_VIEWS[member.role]} />
      </TableCell>
    </>
  );
}
