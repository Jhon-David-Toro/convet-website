"use client";

import { TableCell } from "@/components/patterns/Table";
import { CheckCircle, XCircle } from "@/components/ui/Icon";
import { TEAM_MENU } from "@/lib/admin/admin.menus.constants";
import { useActionToast } from "@/lib/shared/useActionToast";

import { ACTIVATE_LABEL, DEACTIVATE_LABEL, SAVED_MESSAGE } from "../AdminTeam.constants";
import type { MemberRowProps } from "../AdminTeam.types";
import { MemberIdentityCells } from "./MemberIdentityCells";
import { MemberStateCells } from "./MemberStateCells";

/**
 * Row of the team table: identity, state and the row actions, including activating or deactivating the member.
 *
 * @param props Props of the component, see {@link MemberRowProps}.
 * @param props.member Member of the row.
 * @param props.actions Server Actions that change the member.
 * @returns The rendered element.
 */
export function MemberRow({ member, actions }: MemberRowProps) {
  const status = useActionToast(actions?.setActive, SAVED_MESSAGE);
  const active = member.status !== "inactive";
  const items = actions?.setActive
    ? [
        ...TEAM_MENU,
        active
          ? { label: DEACTIVATE_LABEL, icon: XCircle, tone: "destructive" as const, onSelect: () => void status.run(member.id, false) }
          : { label: ACTIVATE_LABEL, icon: CheckCircle, onSelect: () => void status.run(member.id, true) },
      ]
    : TEAM_MENU;

  return (
    <tr aria-busy={status.pending || undefined}>
      <MemberIdentityCells member={member} />
      <MemberStateCells member={member} />
      <TableCell type="actions" actionLabel={`Actions for ${member.name}`} items={items} />
    </tr>
  );
}
