import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import { Users } from "@/components/ui/Icon";
import { ModalButton } from "@/components/sections/ModalButton";
import { TEAM_MEMBERS } from "@/lib/admin/admin.constants";

import { COLUMNS, EMPTY_TEXT, EMPTY_TITLE, IDENTIFIERS_TEXT, IDENTIFIERS_TITLE, INVITE_LABEL, LOAD_ERROR_TITLE, SUBTITLE, TABLE_LABEL, TITLE } from "./AdminTeam.constants";
import type { AdminTeamProps } from "./AdminTeam.types";
import { MemberRow } from "./parts/MemberRow";
import { WorkingHours } from "./parts/WorkingHours";

/**
 * Team page of the admin area: the staff accounts with their identifiers, role, two-step verification and status,
 * the note on the four identifiers, and the working hours of a vet.
 *
 * @param props Props of the component, see {@link AdminTeamProps}.
 * @param props.members Staff members to list; by default the sample team.
 * @param props.loadError Message shown when the team could not be loaded.
 * @param props.actions Server Actions that change a member.
 * @returns The rendered element.
 */
export function AdminTeam({ members = TEAM_MEMBERS, loadError, actions }: AdminTeamProps) {
  return (
    <PageStack>
      <PageHeader
        title={TITLE}
        subtitle={SUBTITLE}
        actions={
          <ModalButton modal="invite" icon="mail">
            {INVITE_LABEL}
          </ModalButton>
        }
      />
      {loadError && (
        <Alert tone="error" title={LOAD_ERROR_TITLE}>
          {loadError}
        </Alert>
      )}
      {!loadError && members.length === 0 && <EmptyState icon={Users} title={EMPTY_TITLE} message={EMPTY_TEXT} />}
      {members.length > 0 && (
        <DataTable label={TABLE_LABEL} columns={COLUMNS} minWidth="64rem">
          {members.map((member) => (
            <MemberRow key={member.id} member={member} actions={actions} />
          ))}
        </DataTable>
      )}
      <Alert tone="info" title={IDENTIFIERS_TITLE}>
        {IDENTIFIERS_TEXT}
      </Alert>
      <WorkingHours />
    </PageStack>
  );
}
