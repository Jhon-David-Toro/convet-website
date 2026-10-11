import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { CATALOG_ROWS } from "@/lib/admin.constants";

import { ADD_LABEL, COLUMNS, SUBTITLE, TABLE_LABEL, TITLE } from "./AdminProducts.constants";
import { CatalogRowView } from "./parts/CatalogRowView";

/**
 * Products page of the admin area: the catalog shared by the website and the inventory, with each product's prescription rule and whether it is published.
 *
 * @returns The rendered element.
 */
export function AdminProducts() {
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
      <DataTable label={TABLE_LABEL} columns={COLUMNS} minWidth="52rem">
        {CATALOG_ROWS.map((product) => (
          <CatalogRowView key={product.id} product={product} />
        ))}
      </DataTable>
    </PageStack>
  );
}
