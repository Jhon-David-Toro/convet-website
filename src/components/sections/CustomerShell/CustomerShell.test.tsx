import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CustomerShell } from "./CustomerShell";
import { isActivePath, topBarFor } from "./CustomerShell.utils";

const pathname = vi.fn();

vi.mock("next/navigation", () => ({ usePathname: () => pathname() }));

describe("CustomerShell", () => {
  beforeEach(() => pathname.mockReturnValue("/app/pets/luna/vaccines"));

  it("renders the page with the greeting and the navigation", () => {
    render(
      <CustomerShell>
        <p>Page</p>
      </CustomerShell>,
    );
    expect(screen.getByRole("main")).toHaveTextContent("Page");
    expect(screen.getByText("Good morning, Anna")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "My pets" })[0]).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Book a visit" })).toHaveAttribute("href", "/book");
  });
});

describe("customer shell utils", () => {
  it("marks the section of the current page", () => {
    expect(isActivePath("/app", "/app")).toBe(true);
    expect(isActivePath("/app", "/app/pets")).toBe(false);
    expect(isActivePath("/app/pets", "/app/pets/luna/history")).toBe(true);
  });

  it("shows the pet name with a back arrow on a pet profile", () => {
    expect(topBarFor("/app/pets/luna/history")).toEqual({ title: "Luna", backHref: "/app/pets" });
    expect(topBarFor("/app")).toEqual({ title: "Hi, Anna" });
  });
});
