import "server-only";

import { getBranches, getBranchServices } from "./branches.api";
import { toServiceRow } from "./branch-services.mappers";
import { getServiceCategories } from "./catalog.api";
import { getBranchVets } from "./staff.api";
import type { AdminServicesData } from "./admin-services.types";

/**
 * Everything the admin services page shows, for the main branch (the first active one): its services with price and state, its
 * bookable vets, and the categories the "New service" dialog offers.
 *
 * @returns The data of the page; without any active branch the table is empty.
 * @throws {ApiError} When the backend fails.
 */
export async function getAdminServicesData(): Promise<AdminServicesData> {
  const [branches, categories] = await Promise.all([getBranches(), getServiceCategories()]);
  const categoryOptions = categories.map((category) => ({ value: category.idCategory, label: category.name }));
  const branch = branches.find((candidate) => candidate.isActive);
  if (!branch) return { rows: [], categories: categoryOptions, vetNames: [] };

  const [services, vets] = await Promise.all([getBranchServices(branch.idBranch), getBranchVets(branch.idBranch)]);
  return {
    branchName: branch.name,
    rows: services.map((service) => toServiceRow(service, vets.length)),
    categories: categoryOptions,
    vetNames: vets.map(({ staff }) => `${staff.user.firstName} ${staff.user.lastName}`),
  };
}
