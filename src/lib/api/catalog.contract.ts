import { z } from "zod";

import { optionalText } from "./api.contract";

/** Service category as `GET /service-categories` and the category endpoints send it. */
export const serviceCategorySchema = z.object({
  idCategory: z.string(),
  name: z.string(),
  slug: z.string(),
  description: optionalText,
  isActive: z.boolean(),
});

/** Service of the catalog with its category, as `GET /services`, `POST /services` and `PATCH /services/:id` send it. */
export const serviceSchema = z.object({
  idService: z.string(),
  name: z.string(),
  slug: z.string(),
  description: optionalText,
  shortDescription: optionalText,
  isPublished: z.boolean(),
  isActive: z.boolean(),
  categoryId: z.string(),
  category: serviceCategorySchema.optional(),
});

/** Answer of `DELETE /services/:id`: the service, now inactive. */
export const deactivatedServiceSchema = z.object({ idService: z.string(), name: z.string(), slug: z.string(), isActive: z.literal(false) });

/** Answer of `DELETE /service-categories/:id`: the category, now inactive. */
export const deactivatedCategorySchema = z.object({ idCategory: z.string(), name: z.string(), slug: z.string(), isActive: z.literal(false) });

export type ServiceCategoryDto = z.infer<typeof serviceCategorySchema>;

export type ServiceDto = z.infer<typeof serviceSchema>;

/** Body of `POST /services` (`CreateServiceDto`). `slug` must match `^[a-z0-9]+(?:-[a-z0-9]+)*$`. */
export type CreateServiceDto = {
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  shortDescription?: string;
};

/** Body of `PATCH /services/:id`: at least one field. */
export type UpdateServiceDto = Partial<CreateServiceDto>;

/** Body of `POST /service-categories` (`CreateServiceCategoryDto`). */
export type CreateCategoryDto = {
  name: string;
  slug: string;
  description?: string;
};

/** Body of `PATCH /service-categories/:id`: at least one field. */
export type UpdateCategoryDto = Partial<CreateCategoryDto>;

/** Seconds the public catalog is kept in the Next.js data cache before it is refreshed in the background. */
export const CATALOG_REVALIDATE_SECONDS = 300;

/** Cache tags of the public catalog, refreshed by the admin actions that change it. */
export const CATALOG_TAGS = { services: "catalog:services", categories: "catalog:categories" } as const;

export const CATALOG_ENDPOINTS = {
  services: "/services",
  service: (idService: string) => `/services/${encodeURIComponent(idService)}`,
  categories: "/service-categories",
  category: (idCategory: string) => `/service-categories/${encodeURIComponent(idCategory)}`,
} as const;
