import { useMemo, useState } from "react";

import { ALL_FILTER } from "../ServiceList.constants";
import type { ServiceFilterState, ServiceFilterValue, UseServiceFilterParams } from "../ServiceList.types";
import { countServices, filterServices } from "../ServiceList.utils";

/**
 * State of the species filter of the services list.
 *
 * @param params Parameters of the hook, see {@link UseServiceFilterParams}.
 * @param params.services Every service of the list.
 * @returns The selected filter, its setter, the matching services and the count of every filter.
 */
export function useServiceFilter({ services }: UseServiceFilterParams): ServiceFilterState {
  const [filter, setFilter] = useState<ServiceFilterValue>(ALL_FILTER);
  const counts = useMemo(() => countServices(services), [services]);
  const visible = useMemo(() => filterServices(services, filter), [services, filter]);

  return { filter, setFilter, visible, counts };
}
