import { CustomerOverview } from "@/components/sections/CustomerOverview";
import { loadData } from "@/lib/api/api.guard";
import { getMyPets } from "@/lib/api/pets.api";

/**
 * Overview page of the customer area. The pets come from the backend. The next appointment, reminders and recent activity are
 * left out until the backend exposes them (see the pending list of the integration).
 *
 * @returns The rendered element.
 */
export default async function CustomerOverviewPage() {
  const { data: pets = [], error } = await loadData(getMyPets);

  return <CustomerOverview pets={pets} loadError={error?.message} />;
}
