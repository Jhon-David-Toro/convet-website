import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/Button";

import { MobileActionBar } from "./MobileActionBar";

describe("MobileActionBar", () => {
  it("is a labelled navigation that holds the quick actions", () => {
    render(
      <MobileActionBar>
        <Button href="/book" variant="accent">
          Book
        </Button>
        <Button href="tel:+2975930404" variant="secondary">
          Call
        </Button>
      </MobileActionBar>,
    );
    expect(screen.getByRole("navigation", { name: "Quick actions" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book" })).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: "Call" })).toBeInTheDocument();
  });
});
