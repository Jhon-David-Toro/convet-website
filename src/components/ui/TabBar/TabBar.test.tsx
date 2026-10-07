import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Home, Paw } from "@/components/ui/Icon";

import { TabBar } from "./TabBar";
import { TabBarItem } from "./TabBarItem";

describe("TabBar", () => {
  it("is a labelled navigation with links and marks the current section", () => {
    render(
      <TabBar>
        <TabBarItem href="/" icon={Home} label="Home" active />
        <TabBarItem href="/pets" icon={Paw} label="Pets" />
      </TabBar>,
    );
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Pets" })).not.toHaveAttribute("aria-current");
  });
});
