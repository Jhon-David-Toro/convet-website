import { z } from "zod";

import { decimal, optionalText } from "./api.contract";
import { serviceCategorySchema, serviceSchema } from "./catalog.contract";

/** Branch (clinic location) as every `/branches` endpoint sends it. `timeZone` only comes in nested includes. */
export const branchSchema = z.object({
  idBranch: z.string(),
  name: z.string(),
  slug: z.string(),
  address: z.string(),
  city: z.string(),
  department: z.string(),
  phone: optionalText,
  email: optionalText,
  isActive: z.boolean(),
  timeZone: optionalText,
});

/** Price of a service in a branch. `amount` is a Prisma `Decimal`, sent as a string. */
export const branchServicePriceSchema = z.object({
  idBranchServicePrice: z.string(),
  branchServiceId: z.string(),
  amount: decimal,
  validFrom: z.string(),
  validUntil: optionalText,
});

const branchServiceBase = z.object({ idBranchService: z.string(), branchId: z.string(), serviceId: z.string(), isActive: z.boolean() });

/** Service offered by a branch with its current price (`GET /branches/:branchId/services`): `prices` holds 0 or 1 item. */
export const branchServiceSchema = branchServiceBase.extend({
  service: serviceSchema.extend({ category: serviceCategorySchema.optional() }),
  prices: z.array(branchServicePriceSchema).default([]),
});

/** Branch that offers a service with its current price (`GET /services/:serviceId/branches`). */
export const serviceBranchSchema = branchServiceBase.extend({ branch: branchSchema, prices: z.array(branchServicePriceSchema).default([]) });

/** Answer of assigning a service or changing its status in a branch. */
export const branchServiceChangeSchema = branchServiceBase.extend({ service: serviceSchema.optional(), branch: branchSchema.optional() });

export type BranchDto = z.infer<typeof branchSchema>;

export type BranchServiceDto = z.infer<typeof branchServiceSchema>;

export type ServiceBranchDto = z.infer<typeof serviceBranchSchema>;

export type BranchServicePriceDto = z.infer<typeof branchServicePriceSchema>;

/** Body of `POST /branches` (`CreateBranchDto`). The backend normalizes the slug. */
export type CreateBranchDto = {
  name: string;
  slug: string;
  address: string;
  city: string;
  department: string;
  phone?: string;
  email?: string;
};

/** Body of `PATCH /branches/:id`: at least one field. */
export type UpdateBranchDto = Partial<CreateBranchDto>;

export const BRANCH_ENDPOINTS = {
  list: "/branches",
  detail: (idBranch: string) => `/branches/${encodeURIComponent(idBranch)}`,
  status: (idBranch: string) => `/branches/${encodeURIComponent(idBranch)}/status`,
  services: (idBranch: string) => `/branches/${encodeURIComponent(idBranch)}/services`,
  serviceStatus: (idBranch: string, idBranchService: string) => `/branches/${encodeURIComponent(idBranch)}/services/${encodeURIComponent(idBranchService)}/status`,
  servicePrice: (idBranch: string, idBranchService: string) => `/branches/${encodeURIComponent(idBranch)}/services/${encodeURIComponent(idBranchService)}/price`,
  servicePrices: (idBranch: string, idBranchService: string) => `/branches/${encodeURIComponent(idBranch)}/services/${encodeURIComponent(idBranchService)}/prices`,
  serviceBranches: (idService: string) => `/services/${encodeURIComponent(idService)}/branches`,
} as const;
