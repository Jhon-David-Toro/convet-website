import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it.each(["card", "list-row"] as const)("is decorative (%s)", (type) => {
    const { container } = render(<Skeleton type={type} />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
