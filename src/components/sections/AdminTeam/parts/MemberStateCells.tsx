import { StackedCell } from "@/components/patterns/StackedCell";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { TableCell } from "@/components/patterns/Table";

import { STATUS_VIEWS, TWO_STEP_VIEWS } from "../AdminTeam.constants";
import type { MemberCellsProps } from "../AdminTeam.types";

/**
 * Last cells of a team row: the clinical number, the location, the two-step verification and the status.
 *
 * @param props Props of the component, see {@link MemberCellsProps}.
 * @param props.member Member of the row.
 * @returns The rendered element.
 */
export function MemberStateCells({ member }: MemberCellsProps) {
  return (
    <>
      <TableCell>
        <StackedCell primary={member.clinicalNo} secondary={member.clinicalLabel} mono />
      </TableCell>
      <TableCell>{member.location}</TableCell>
      <TableCell type="badge">
        <StatusBadge view={TWO_STEP_VIEWS[member.twoStep]} />
      </TableCell>
      <TableCell type="badge">
        <StatusBadge view={STATUS_VIEWS[member.status]} />
      </TableCell>
    </>
  );
}
