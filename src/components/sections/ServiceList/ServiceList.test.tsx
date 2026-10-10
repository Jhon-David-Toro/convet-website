import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ServiceList } from "./ServiceList";

describe("ServiceList", () => {
  it("lists every service with its booking and details links", () => {
    render(<ServiceList />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Book vaccination" })).toHaveAttribute("href", "/book?service=vaccinations");
    expect(screen.getAllByRole("link", { name: /View details/ })[0]).toHaveAttribute("href", "/services/consultations");
  });

  it("sends treatments to WhatsApp instead of the booking page", () => {
    render(<ServiceList />);
    expect(screen.getByRole("link", { name: "Ask us first" }).getAttribute("href")).toContain("wa.me");
  });

  it("filters by species and keeps the counts", async () => {
    render(<ServiceList />);
    await userEvent.click(screen.getByRole("button", { name: /Birds & exotics/ }));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("button", { name: /All/ })).toHaveTextContent("3");
  });
});
