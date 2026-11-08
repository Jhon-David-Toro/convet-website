import { describe, expect, it } from "vitest";

import { branchServiceSchema } from "./branches.contract";
import { amountFrom, priceLabel, toServiceRow } from "./branch-services.mappers";

describe("branchServiceSchema", () => {
  it("reads the Decimal price the backend sends as a string", () => {
    const service = branchServiceSchema.parse({
      idBranchService: "bs1",
      branchId: "b1",
      serviceId: "s1",
      isActive: true,
      service: { idService: "s1", name: "Vaccination", slug: "vaccinations", isPublished: true, isActive: true, categoryId: "c1" },
      prices: [{ idBranchServicePrice: "p1", branchServiceId: "bs1", amount: "45.00", validFrom: "2026-11-01T00:00:00.000Z", validUntil: null }],
    });
    expect(service.prices[0].amount).toBe(45);
    expect(toServiceRow(service, 2)).toMatchObject({ id: "bs1", branchId: "b1", name: "Vaccination", duration: 20, online: true, vets: 2, price: "AWG 45.00" });
  });
});

describe("price helpers", () => {
  it("formats and reads prices", () => {
    expect(priceLabel(undefined)).toBe("");
    expect(amountFrom("AWG 45")).toBe(45);
    expect(amountFrom("45,505")).toBe(45.51);
    expect(amountFrom("")).toBeUndefined();
    expect(amountFrom("0")).toBeUndefined();
  });
});
