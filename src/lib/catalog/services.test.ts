import { describe, expect, it } from "vitest";

import { SERVICES } from "./services.constants";
import { findService, publishedServices } from "./services.utils";

describe("findService", () => {
  it("finds a service by its slug and returns nothing for an unknown one", () => {
    expect(findService(SERVICES[0].slug)).toBe(SERVICES[0]);
    expect(findService("nobody")).toBeUndefined();
  });
});

describe("publishedServices", () => {
  it("shows the editorial list when the backend could not be read or publishes none of it", () => {
    expect(publishedServices(undefined)).toBe(SERVICES);
    expect(publishedServices([{ slug: "unknown", title: "Unknown" }])).toBe(SERVICES);
  });

  it("keeps only the published services and puts the backend texts over the editorial ones", () => {
    const [first, second] = SERVICES;
    const services = publishedServices([{ slug: second.slug, title: "New name", cardSummary: "New summary" }]);
    expect(services).toHaveLength(1);
    expect(services[0]).toMatchObject({ slug: second.slug, title: "New name", cardSummary: "New summary", lead: second.lead });
    expect(findService(first.slug, services)).toBeUndefined();
  });
});
