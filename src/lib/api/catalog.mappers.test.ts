import { describe, expect, it } from "vitest";

import { collection } from "./api.contract";
import { serviceSchema } from "./catalog.contract";
import { slugFrom, toServiceContent } from "./catalog.mappers";

const SERVICE = { idService: "s1", name: "Vaccines", slug: "vaccinations", description: null, shortDescription: "Core vaccines", isPublished: true, isActive: true, categoryId: "c1", createdAt: "2026-11-01T00:00:00.000Z" };

describe("serviceSchema", () => {
  it("accepts the bare array of GET /services with nulls and its category", () => {
    const [service] = collection(serviceSchema).parse([{ ...SERVICE, category: { idCategory: "c1", name: "Prevention", slug: "prevention", description: null, isActive: true } }]);
    expect(service).toMatchObject({ idService: "s1", description: undefined, category: { name: "Prevention" } });
    expect(service).not.toHaveProperty("createdAt");
  });
});

describe("toServiceContent", () => {
  it("keeps the slug and the name and leaves missing texts out", () => {
    expect(toServiceContent(serviceSchema.parse(SERVICE))).toEqual({ slug: "vaccinations", title: "Vaccines", cardSummary: "Core vaccines", lead: undefined });
  });
});

describe("slugFrom", () => {
  it("builds a slug the backend accepts", () => {
    expect(slugFrom("  Dental cleaning & polish ")).toBe("dental-cleaning-polish");
    expect(slugFrom("Vacunación Básica")).toBe("vacunacion-basica");
  });
});
