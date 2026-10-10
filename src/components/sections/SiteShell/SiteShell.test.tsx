import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteShell } from "./SiteShell";
import { markActiveLink } from "./SiteShell.utils";

describe("SiteShell", () => {
  it("renders the page inside main with the header and footer", () => {
    render(
      <SiteShell current="/services">
        <p>Page</p>
      </SiteShell>,
    );
    expect(screen.getByRole("main")).toHaveTextContent("Page");
    expect(screen.getAllByRole("link", { name: "Services" })[0]).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("uses a custom mobile bar when given", () => {
    render(
      <SiteShell current="/" mobileBar={<p>Custom bar</p>}>
        <p>Page</p>
      </SiteShell>,
    );
    expect(screen.getByText("Custom bar")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "SOS 24/7" })).not.toBeInTheDocument();
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
