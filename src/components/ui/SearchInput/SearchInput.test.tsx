import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("is a searchbox named by its hidden label", () => {
    render(<SearchInput label="Search" />);
    expect(screen.getByRole("searchbox", { name: "Search" })).toBeInTheDocument();
  });

  it("accepts typing", async () => {
    render(<SearchInput label="Search" />);
    await userEvent.type(screen.getByRole("searchbox"), "Luna");
    expect(screen.getByRole("searchbox")).toHaveValue("Luna");
  });

  it("announces the shortcut hint", () => {
    render(<SearchInput label="Search" shortcut="Ctrl K" />);
    expect(screen.getByRole("searchbox")).toHaveAttribute("aria-keyshortcuts", "Ctrl K");
    expect(screen.getByText("Ctrl K")).toBeInTheDocument();
  });
});
