import { TableCell } from "@/components/patterns/Table";

import type { MemberRowProps } from "../AdminTeam.types";
import { MemberIdentityCells } from "./MemberIdentityCells";
import { MemberStateCells } from "./MemberStateCells";

/**
 * Row of the team table: identity, state and the row actions.
 *
 * @param props Props of the component, see {@link MemberRowProps}.
 * @param props.member Member of the row.
 * @returns The rendered element.
 */
export function MemberRow({ member }: MemberRowProps) {
  return (
    <tr>
      <MemberIdentityCells member={member} />
      <MemberStateCells member={member} />
      <TableCell type="actions" actionLabel={`Actions for ${member.name}`} />
    </tr>
  );
}
