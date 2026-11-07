import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CustomerShell } from "./CustomerShell";
import { isActivePath, topBarFor } from "./CustomerShell.utils";

const pathname = vi.fn();
const replace = vi.fn();
const refresh = vi.fn();

vi.mock("next/navigation", () => ({ usePathname: () => pathname(), useRouter: () => ({ replace, refresh }) }));

const USER = { name: "Anna Lee", role: "Client", firstName: "Anna" };

describe("CustomerShell", () => {
  beforeEach(() => pathname.mockReturnValue("/app/pets/luna/vaccines"));

  it("renders the page with the greeting and the navigation", () => {
    render(
      <CustomerShell user={USER}>
        <p>Page</p>
      </CustomerShell>,
    );
    expect(screen.getByRole("main")).toHaveTextContent("Page");
    expect(screen.getByText("Hello, Anna")).toBeInTheDocument();
    expect(screen.getByText("Anna Lee")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "My pets" })[0]).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Book a visit" })).toHaveAttribute("href", "/book");
  });
});

describe("CustomerShell sign out", () => {
  beforeEach(() => {
    replace.mockClear();
    refresh.mockClear();
    pathname.mockReturnValue("/app");
  });

  it("clears the session on the server and then goes to sign in", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<CustomerShell user={USER}><p>Page</p></CustomerShell>);
    await userEvent.click(screen.getByRole("button", { name: "Sign out" }));
    expect(fetchMock).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });
    await vi.waitFor(() => expect(replace).toHaveBeenCalledWith("/sign-in"));
    expect(refresh).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("stays put when the server could not clear the session", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));
    render(<CustomerShell user={USER}><p>Page</p></CustomerShell>);
    await userEvent.click(screen.getByRole("button", { name: "Sign out" }));
    await vi.waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(replace).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});

describe("customer shell utils", () => {
  it("marks the section of the current page", () => {
    expect(isActivePath("/app", "/app")).toBe(true);
    expect(isActivePath("/app", "/app/pets")).toBe(false);
    expect(isActivePath("/app/pets", "/app/pets/luna/history")).toBe(true);
  });

  it("shows the pet name with a back arrow on a pet profile", () => {
    expect(topBarFor("/app/pets/luna/history", "Anna")).toEqual({ title: "Luna", backHref: "/app/pets" });
    expect(topBarFor("/app", "Anna")).toEqual({ title: "Hi, Anna" });
  });
});

describe("CustomerShell on the home page", () => {
  it("shows the circular logo link instead of a back arrow", () => {
    pathname.mockReturnValue("/app");
    render(
      <CustomerShell user={USER}>
        <p>Page</p>
      </CustomerShell>,
    );
    expect(screen.getAllByRole("link", { name: "CONVET home" })[0]).toHaveAttribute("href", "/");
  });

  it("falls back to the brand name for a page without title", () => {
    expect(topBarFor("/app/unknown-page", "Anna")).toEqual({ title: "CONVET" });
  });
});
