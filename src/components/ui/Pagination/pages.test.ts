import { describe, expect, it } from "vitest";

import { pageTokens } from "./pages";

describe("pageTokens", () => {
  it.each([
    [1, 25, [1, 2, 3, "ellipsis", 25]],
    [2, 25, [1, 2, 3, "ellipsis", 25]],
    [3, 25, [1, 2, 3, 4, "ellipsis", 25]],
    [5, 25, [1, "ellipsis", 4, 5, 6, "ellipsis", 25]],
    [24, 25, [1, "ellipsis", 23, 24, 25]],
    [25, 25, [1, "ellipsis", 23, 24, 25]],
    [1, 3, [1, 2, 3]],
    [1, 1, [1]],
    [4, 6, [1, 2, 3, 4, 5, 6]],
  ])("page %i of %i", (page, count, expected) => {
    expect(pageTokens(page, count)).toEqual(expected);
  });
});
