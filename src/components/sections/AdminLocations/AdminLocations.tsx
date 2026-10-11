import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { LOCATION } from "@/lib/admin/admin.constants";

import { ADD_LABEL, SUBTITLE, TITLE } from "./AdminLocations.constants";
import { HoursCard } from "./parts/HoursCard";
import { LocationCard } from "./parts/LocationCard";
import styles from "./AdminLocations.module.scss";

/**
 * Locations page of the admin area: the clinic with its map and phones, its opening hours and the upcoming closures.
 * Adding another location is reserved to the owner, so the button is disabled.
 *
 * @returns The rendered element.
 */
export function AdminLocations() {
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
      <div className={styles.columns}>
        <LocationCard location={LOCATION} />
        <HoursCard location={LOCATION} />
      </div>
    </PageStack>
  );
}
