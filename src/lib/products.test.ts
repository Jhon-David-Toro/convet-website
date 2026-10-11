import { describe, expect, it } from "vitest";

import { PRODUCTS } from "./products.constants";
import { findProduct } from "./products.utils";

describe("findProduct", () => {
  it("finds a product by its slug and returns nothing for an unknown one", () => {
    expect(findProduct(PRODUCTS[0].slug)).toBe(PRODUCTS[0]);
    expect(findProduct("nobody")).toBeUndefined();
  });
});
