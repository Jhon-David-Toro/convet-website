import { describe, expect, it } from "vitest";

import { CUSTOMER_PETS } from "./customer.constants";
import { petCardProps, weightsOf } from "./customer.utils";

describe("customer utils", () => {
  it("leaves the next visit out of the facts when the pet has none", () => {
    const facts = petCardProps({ ...CUSTOMER_PETS[0], nextVisit: undefined }).facts ?? [];
    expect(facts.map((fact) => fact.label)).toEqual(["Microchip", "Weight"]);
  });

  it("has no weights for an unknown pet", () => {
    expect(weightsOf("nobody")).toEqual([]);
  });
});
