import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Dropdown, MenuDivider } from "./Dropdown";

describe("Dropdown", () => {
  it("renders its content and forwards the role", () => {
    render(
      <Dropdown role="menu" aria-label="Actions">
        <p>Reschedule</p>
        <MenuDivider />
        <p>Cancel</p>
      </Dropdown>,
    );
    expect(screen.getByRole("menu", { name: "Actions" })).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
