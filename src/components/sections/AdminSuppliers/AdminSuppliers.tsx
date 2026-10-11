import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { SUPPLIERS } from "@/lib/admin/admin.constants";

import { ADD_LABEL, COLUMNS, NOTE_TEXT, NOTE_TITLE, SUBTITLE, TABLE_LABEL, TITLE } from "./AdminSuppliers.constants";
import { SupplierRow } from "./parts/SupplierRow";

/**
 * Suppliers page of the admin area: the suppliers the clinic buys from and when each last delivered, with a note that purchase orders come later.
 *
 * @returns The rendered element.
 */
export function AdminSuppliers() {
  return (
    <PageStack>
      <PageHeader
        title={TITLE}
        subtitle={SUBTITLE}
        actions={
          <Button type="button" leadingIcon={Plus}>
            {ADD_LABEL}
          </Button>
        }
      />
      <DataTable label={TABLE_LABEL} columns={COLUMNS}>
        {SUPPLIERS.map((supplier) => (
          <SupplierRow key={supplier.id} supplier={supplier} />
        ))}
      </DataTable>
      <Alert tone="info" title={NOTE_TITLE}>
        {NOTE_TEXT}
      </Alert>
    </PageStack>
  );
}
