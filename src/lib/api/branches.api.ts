import "server-only";

import { cache } from "react";

import { apiRequest } from "./api.client";
import { collection } from "./api.contract";
import {
  BRANCH_ENDPOINTS,
  branchSchema,
  branchServiceChangeSchema,
  branchServicePriceSchema,
  branchServiceSchema,
  serviceBranchSchema,
} from "./branches.contract";
import type { BranchDto, BranchServiceDto, BranchServicePriceDto, CreateBranchDto, ServiceBranchDto, UpdateBranchDto } from "./branches.contract";

/**
 * Every branch, active or not, newest first (admin). Cached for the length of a request.
 *
 * @returns The branches.
 * @throws {ApiError} `forbidden` for non-admins.
 */
export const getBranches = cache(async (): Promise<BranchDto[]> => apiRequest(BRANCH_ENDPOINTS.list, { schema: collection(branchSchema) }));

/**
 * One branch (admin).
 *
 * @param idBranch Id of the branch.
 * @returns The branch.
 * @throws {ApiError} `not-found` when it does not exist.
 */
export async function getBranch(idBranch: string): Promise<BranchDto> {
  return apiRequest(BRANCH_ENDPOINTS.detail(idBranch), { schema: branchSchema });
}

/**
 * Creates a branch (admin).
 *
 * @param dto Name, slug, address and contact.
 * @returns The new branch.
 * @throws {ApiError} `conflict` when the slug is taken.
 */
export async function createBranch(dto: CreateBranchDto): Promise<BranchDto> {
  return apiRequest(BRANCH_ENDPOINTS.list, { method: "POST", body: dto, schema: branchSchema });
}

/**
 * Changes a branch (admin).
 *
 * @param idBranch Id of the branch.
 * @param dto Fields to change, at least one.
 * @returns The updated branch.
 * @throws {ApiError} `conflict` when the new slug is taken.
 */
export async function updateBranch(idBranch: string, dto: UpdateBranchDto): Promise<BranchDto> {
  return apiRequest(BRANCH_ENDPOINTS.detail(idBranch), { method: "PATCH", body: dto, schema: branchSchema });
}

/**
 * Opens or closes a branch (admin).
 *
 * @param idBranch Id of the branch.
 * @param isActive Whether the branch takes appointments.
 * @returns The updated branch.
 */
export async function setBranchActive(idBranch: string, isActive: boolean): Promise<BranchDto> {
  return apiRequest(BRANCH_ENDPOINTS.status(idBranch), { method: "PATCH", body: { isActive }, schema: branchSchema });
}

/**
 * Services of a branch, active or not, with their current price (admin). Cached for the length of a request.
 *
 * @param idBranch Id of the branch.
 * @returns The services of the branch, by name.
 */
export const getBranchServices = cache(async (idBranch: string): Promise<BranchServiceDto[]> =>
  apiRequest(BRANCH_ENDPOINTS.services(idBranch), { schema: collection(branchServiceSchema) }),
);

/**
 * Branches that offer a service, with their current price (admin).
 *
 * @param idService Id of the catalog service.
 * @returns The branches, by name.
 */
export async function getServiceBranches(idService: string): Promise<ServiceBranchDto[]> {
  return apiRequest(BRANCH_ENDPOINTS.serviceBranches(idService), { schema: collection(serviceBranchSchema) });
}

/**
 * Offers a published service in a branch (admin). It has no price until {@link setBranchServicePrice} is called.
 *
 * @param idBranch Id of the branch.
 * @param serviceId Id of the catalog service.
 * @throws {ApiError} `conflict` when the branch already offers it; `validation` when it is not published.
 */
export async function assignServiceToBranch(idBranch: string, serviceId: string): Promise<void> {
  await apiRequest(BRANCH_ENDPOINTS.services(idBranch), { method: "POST", body: { serviceId }, schema: branchServiceChangeSchema });
}

/**
 * Turns a service of a branch on or off for booking (admin).
 *
 * @param idBranch Id of the branch.
 * @param idBranchService Id of the service in the branch.
 * @param isActive Whether customers can book it.
 */
export async function setBranchServiceActive(idBranch: string, idBranchService: string, isActive: boolean): Promise<void> {
  await apiRequest(BRANCH_ENDPOINTS.serviceStatus(idBranch, idBranchService), { method: "PATCH", body: { isActive }, schema: branchServiceChangeSchema });
}

/**
 * Sets the price of a service in a branch (admin). The old price is kept in the history.
 *
 * @param idBranch Id of the branch.
 * @param idBranchService Id of the service in the branch.
 * @param amount New price, positive with at most 2 decimals.
 * @returns The new price.
 * @throws {ApiError} `validation` when the price is the same or the service is off in the branch.
 */
export async function setBranchServicePrice(idBranch: string, idBranchService: string, amount: number): Promise<BranchServicePriceDto> {
  return apiRequest(BRANCH_ENDPOINTS.servicePrice(idBranch, idBranchService), { method: "PATCH", body: { amount }, schema: branchServicePriceSchema });
}

/**
 * Price history of a service in a branch, newest first (admin).
 *
 * @param idBranch Id of the branch.
 * @param idBranchService Id of the service in the branch.
 * @returns Every price it has had.
 */
export async function getBranchServicePrices(idBranch: string, idBranchService: string): Promise<BranchServicePriceDto[]> {
  return apiRequest(BRANCH_ENDPOINTS.servicePrices(idBranch, idBranchService), { schema: collection(branchServicePriceSchema) });
}
