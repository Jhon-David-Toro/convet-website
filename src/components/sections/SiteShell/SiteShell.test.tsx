import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { verifySession } from "@/lib/auth/auth.dal";

import { SiteShell } from "./SiteShell";
import { markActiveLink } from "./SiteShell.utils";

vi.mock("@/lib/auth/auth.dal", () => ({ verifySession: vi.fn().mockResolvedValue(null) }));

describe("SiteShell", () => {
  it("renders the page inside main with the header and footer", async () => {
    render(await SiteShell({ current: "/services", children: <p>Page</p> }));
    expect(screen.getByRole("main")).toHaveTextContent("Page");
    expect(screen.getAllByRole("link", { name: "Services" })[0]).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("uses a custom mobile bar when given", async () => {
    render(await SiteShell({ current: "/", mobileBar: <p>Custom bar</p>, children: <p>Page</p> }));
    expect(screen.getByText("Custom bar")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "SOS 24/7" })).not.toBeInTheDocument();
  });

  it("shows \"My account\" linking to the user's area instead of sign in when signed in", async () => {
    vi.mocked(verifySession).mockResolvedValueOnce({ idUser: "1", firstName: "Ana", lastName: "Ruiz", email: "ana@example.com", role: "CUSTOMER" });
    render(await SiteShell({ current: "/", children: <p>Page</p> }));
    expect(screen.queryByRole("link", { name: /sign in/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "My account" })[0]).toHaveAttribute("href", "/app");
  });
});

describe("markActiveLink", () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ];

  it("marks only the section of the current page", () => {
    expect(markActiveLink({ links, current: "/services/vaccinations" }).map((link) => link.active)).toEqual([false, true]);
    expect(markActiveLink({ links, current: "/" }).map((link) => link.active)).toEqual([true, false]);
  });
});
