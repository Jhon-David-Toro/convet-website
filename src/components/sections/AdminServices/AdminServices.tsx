"use client";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { ServiceModal } from "@/components/sections/ServiceModal";
import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { SERVICE_ROWS } from "@/lib/admin/admin.constants";
import { useDisclosure } from "@/lib/shared/useDisclosure";

import { NEW_LABEL, SUBTITLE, TITLE } from "./AdminServices.constants";
import type { AdminServicesProps } from "./AdminServices.types";
import { ServicesContent } from "./parts/ServicesContent";

/**
 * Services page of the admin area: the services clients see on the website and can book, and the settings of the selected one.
 *
 * @param props Props of the component, see {@link AdminServicesProps}.
 * @param props.rows Services of the branch; by default the sample ones.
 * @param props.loadError Message shown when the services could not be loaded.
 * @param props.categories Categories the "New service" dialog offers.
 * @param props.vetNames Vets the "New service" dialog offers.
 * @param props.actions Server Actions that save the rules and create services.
 * @returns The rendered element.
 */
export function AdminServices({ rows = SERVICE_ROWS, loadError, categories, vetNames, actions }: AdminServicesProps) {
  const creating = useDisclosure();

  return (
    <PageStack>
      <PageHeader
        title={TITLE}
        subtitle={SUBTITLE}
        actions={
          <Button type="button" leadingIcon={Plus} onClick={creating.show}>
            {NEW_LABEL}
          </Button>
        }
      />
      <ServicesContent rows={rows} loadError={loadError} saveRules={actions?.saveRules} />
      <ServiceModal open={creating.open} onClose={creating.hide} categories={categories} vetNames={vetNames} onSave={actions?.createService} />
    </PageStack>
  );
}
