import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmergencyCard } from "./EmergencyCard";

describe("EmergencyCard", () => {
  it("shows the number and a call link", () => {
    render(
      <EmergencyCard
        aria-label="Emergency"
        label="24/7 Emergency · Call now"
        number="593-0404"
        note="Day or night, a vet answers."
        href="tel:+2975930404"
        callLabel="Call 593-0404"
      />,
    );
    expect(screen.getByRole("region", { name: "Emergency" })).toBeInTheDocument();
    expect(screen.getByText("593-0404")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Call 593-0404" })).toHaveAttribute("href", "tel:+2975930404");
  });
});
