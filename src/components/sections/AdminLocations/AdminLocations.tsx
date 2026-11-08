import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Building, Plus } from "@/components/ui/Icon";
import { LOCATION } from "@/lib/admin/admin.constants";

import { ADD_LABEL, EMPTY_TEXT, EMPTY_TITLE, LOAD_ERROR_TITLE, SUBTITLE, TITLE } from "./AdminLocations.constants";
import type { AdminLocationsProps } from "./AdminLocations.types";
import { HoursCard } from "./parts/HoursCard";
import { LocationCard } from "./parts/LocationCard";
import styles from "./AdminLocations.module.scss";

/**
 * Locations page of the admin area: one card per branch of the backend with its state and phone, and the opening hours and upcoming
 * closures of the clinic. Adding another location is reserved to the owner, so the button is disabled.
 *
 * @param props Props of the component, see {@link AdminLocationsProps}.
 * @param props.locations Branches to show.
 * @param props.loadError Message shown when the branches could not be loaded.
 * @param props.actions Server Actions that change a branch.
 * @returns The rendered element.
 */
export function AdminLocations({ locations, loadError, actions }: AdminLocationsProps) {
  return (
    <PageStack>
      <PageHeader
        title={TITLE}
        subtitle={SUBTITLE}
        actions={
          <Button type="button" variant="secondary" leadingIcon={Plus} disabled>
            {ADD_LABEL}
          </Button>
        }
      />
      {loadError && (
        <Alert tone="error" title={LOAD_ERROR_TITLE}>
          {loadError}
        </Alert>
      )}
      {!loadError && locations.length === 0 && <EmptyState icon={Building} title={EMPTY_TITLE} message={EMPTY_TEXT} />}
      <div className={styles.columns}>
        <div className={styles.locations}>
          {locations.map((location) => (
            <LocationCard key={location.id ?? location.name} location={location} actions={actions} />
          ))}
        </div>
        <HoursCard location={locations[0] ?? LOCATION} />
      </div>
    </PageStack>
  );
}
