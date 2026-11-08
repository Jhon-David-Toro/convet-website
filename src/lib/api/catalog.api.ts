import "server-only";

import type { ServiceContent } from "@/lib/catalog/services.types";

import { apiRequest } from "./api.client";
import { collection } from "./api.contract";
import {
  CATALOG_ENDPOINTS,
  CATALOG_REVALIDATE_SECONDS,
  CATALOG_TAGS,
  deactivatedCategorySchema,
  deactivatedServiceSchema,
  serviceCategorySchema,
  serviceSchema,
} from "./catalog.contract";
import type { CreateCategoryDto, CreateServiceDto, ServiceCategoryDto, ServiceDto, UpdateCategoryDto, UpdateServiceDto } from "./catalog.contract";
import { toServiceContent } from "./catalog.mappers";

/**
 * Published services of the public catalog. The endpoint is public and the answer is cached, so the public pages stay fast.
 *
 * @returns The services, by name.
 * @throws {ApiError} When the backend fails or answers something unexpected.
 */
export async function getPublishedServices(): Promise<ServiceDto[]> {
  return apiRequest(CATALOG_ENDPOINTS.services, { schema: collection(serviceSchema), revalidate: CATALOG_REVALIDATE_SECONDS, tags: [CATALOG_TAGS.services] });
}

/**
 * Texts of the published services for the public pages. It never fails: without the backend the pages use their editorial copy.
 *
 * @returns The texts of each published service, or `undefined` when the backend could not be read.
 */
export async function getPublicServiceContent(): Promise<ServiceContent[] | undefined> {
  try {
    return (await getPublishedServices()).map(toServiceContent);
  } catch (error) {
    console.error("[catalog] the published services could not be loaded", error);
    return undefined;
  }
}

/**
 * Active service categories. The endpoint is public and the answer is cached.
 *
 * @returns The categories, by name.
 * @throws {ApiError} When the backend fails.
 */
export async function getServiceCategories(): Promise<ServiceCategoryDto[]> {
  return apiRequest(CATALOG_ENDPOINTS.categories, { schema: collection(serviceCategorySchema), revalidate: CATALOG_REVALIDATE_SECONDS, tags: [CATALOG_TAGS.categories] });
}

/**
 * Creates a service (staff and admin). The backend creates it unpublished.
 *
 * @param dto Name, slug, category and descriptions.
 * @returns The new service.
 * @throws {ApiError} `validation` when the slug is taken or the data is not valid; `not-found` for an inactive category.
 */
export async function createService(dto: CreateServiceDto): Promise<ServiceDto> {
  return apiRequest(CATALOG_ENDPOINTS.services, { method: "POST", body: dto, schema: serviceSchema });
}

/**
 * Changes a service (staff and admin).
 *
 * @param idService Id of the service.
 * @param dto Fields to change, at least one.
 * @returns The updated service.
 * @throws {ApiError} `not-found` for an unknown service; `validation` for invalid data.
 */
export async function updateService(idService: string, dto: UpdateServiceDto): Promise<ServiceDto> {
  return apiRequest(CATALOG_ENDPOINTS.service(idService), { method: "PATCH", body: dto, schema: serviceSchema });
}

/**
 * Deactivates a service (staff and admin); it disappears from the public catalog.
 *
 * @param idService Id of the service.
 * @throws {ApiError} `not-found` when the service is missing or already inactive.
 */
export async function deactivateService(idService: string): Promise<void> {
  await apiRequest(CATALOG_ENDPOINTS.service(idService), { method: "DELETE", schema: deactivatedServiceSchema });
}

/**
 * Creates a service category (staff and admin).
 *
 * @param dto Name, slug and description.
 * @returns The new category.
 * @throws {ApiError} `validation` when the slug is taken.
 */
export async function createServiceCategory(dto: CreateCategoryDto): Promise<ServiceCategoryDto> {
  return apiRequest(CATALOG_ENDPOINTS.categories, { method: "POST", body: dto, schema: serviceCategorySchema });
}

/**
 * Changes a service category (staff and admin).
 *
 * @param idCategory Id of the category.
 * @param dto Fields to change, at least one.
 * @returns The updated category.
 * @throws {ApiError} `not-found` for an unknown category.
 */
export async function updateServiceCategory(idCategory: string, dto: UpdateCategoryDto): Promise<ServiceCategoryDto> {
  return apiRequest(CATALOG_ENDPOINTS.category(idCategory), { method: "PATCH", body: dto, schema: serviceCategorySchema });
}

/**
 * Deactivates a service category (staff and admin).
 *
 * @param idCategory Id of the category.
 * @throws {ApiError} `validation` when the category still has active services.
 */
export async function deactivateServiceCategory(idCategory: string): Promise<void> {
  await apiRequest(CATALOG_ENDPOINTS.category(idCategory), { method: "DELETE", schema: deactivatedCategorySchema });
}
