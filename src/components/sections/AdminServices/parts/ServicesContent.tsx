"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import { Stethoscope } from "@/components/ui/Icon";

import { EMPTY_TEXT, EMPTY_TITLE, LOAD_ERROR_TITLE } from "../AdminServices.constants";
import type { ServicesContentProps } from "../AdminServices.types";
import { ServicePanel } from "./ServicePanel";
import { ServicesTable } from "./ServicesTable";
import styles from "../AdminServices.module.scss";

/**
 * Body of the services page: the load error, the empty state, or the table with the panel of the selected service.
 *
 * @param props Props of the component, see {@link ServicesContentProps}.
 * @param props.rows Services of the branch.
 * @param props.loadError Message shown when the services could not be loaded.
 * @param props.saveRules Saves the booking rules in the backend.
 * @returns The rendered element.
 */
export function ServicesContent({ rows, loadError, saveRules }: ServicesContentProps) {
  const [selectedId, setSelectedId] = useState(rows[1]?.id ?? rows[0]?.id);
  const selected = rows.find((service) => service.id === selectedId) ?? rows[0];

  if (loadError) {
    return (
      <Alert tone="error" title={LOAD_ERROR_TITLE}>
        {loadError}
      </Alert>
    );
  }
  if (!selected) return <EmptyState icon={Stethoscope} title={EMPTY_TITLE} message={EMPTY_TEXT} />;
  return (
    <div className={styles.columns}>
      <ServicesTable rows={rows} selectedId={selected.id} onSelect={setSelectedId} />
      <ServicePanel key={selected.id} service={selected} saveRules={saveRules} />
    </div>
  );
}
