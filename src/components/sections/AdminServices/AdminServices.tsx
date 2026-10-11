"use client";

import { useState } from "react";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { SERVICE_ROWS } from "@/lib/admin/admin.constants";

import styles from "./AdminServices.module.scss";
import { NEW_LABEL, SUBTITLE, TITLE } from "./AdminServices.constants";
import { ServicePanel } from "./parts/ServicePanel";
import { ServicesTable } from "./parts/ServicesTable";

/**
 * Services page of the admin area: the services clients see on the website and can book, and the settings of the selected one.
 *
 * @returns The rendered element.
 */
export function AdminServices() {
  const [selectedId, setSelectedId] = useState(SERVICE_ROWS[1].id);
  const selected = SERVICE_ROWS.find((service) => service.id === selectedId) ?? SERVICE_ROWS[0];

  return (
    <PageStack>
      <PageHeader
        title={TITLE}
        subtitle={SUBTITLE}
        actions={
          <Button type="button" leadingIcon={Plus}>
            {NEW_LABEL}
          </Button>
        }
      />
      <div className={styles.columns}>
        <ServicesTable selectedId={selected.id} onSelect={setSelectedId} />
        <ServicePanel key={selected.id} service={selected} />
      </div>
    </PageStack>
  );
}
