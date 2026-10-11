import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Mail } from "@/components/ui/Icon";
import { TEAM_MEMBERS } from "@/lib/admin/admin.constants";

import { COLUMNS, IDENTIFIERS_TEXT, IDENTIFIERS_TITLE, INVITE_LABEL, SUBTITLE, TABLE_LABEL, TITLE } from "./AdminTeam.constants";
import { MemberRow } from "./parts/MemberRow";
import { WorkingHours } from "./parts/WorkingHours";

/**
 * Team page of the admin area: the staff accounts with their identifiers, role, two-step verification and status,
 * the note on the four identifiers, and the working hours of a vet.
 *
 * @returns The rendered element.
 */
export function AdminTeam() {
  return (
    <PageStack>
      <PageHeader
        title={TITLE}
        subtitle={SUBTITLE}
        actions={
          <Button type="button" leadingIcon={Mail}>
            {INVITE_LABEL}
          </Button>
        }
      />
      <DataTable label={TABLE_LABEL} columns={COLUMNS} minWidth="64rem">
        {TEAM_MEMBERS.map((member) => (
          <MemberRow key={member.id} member={member} />
        ))}
      </DataTable>
      <Alert tone="info" title={IDENTIFIERS_TITLE}>
        {IDENTIFIERS_TEXT}
      </Alert>
      <WorkingHours />
    </PageStack>
  );
}
