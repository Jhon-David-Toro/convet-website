import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("renders the title as the page heading with its subtitle and actions", () => {
    render(<PageHeader title="Stock" subtitle="148 products" actions={<button type="button">Receive</button>} />);
    expect(screen.getByRole("heading", { level: 1, name: "Stock" })).toBeInTheDocument();
    expect(screen.getByText("148 products")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Receive" })).toBeInTheDocument();
  });

  it("omits the subtitle and the actions when they are not given", () => {
    render(<PageHeader title="Team" />);
    expect(screen.getByRole("banner")).toHaveTextContent("Team");
  });
});
