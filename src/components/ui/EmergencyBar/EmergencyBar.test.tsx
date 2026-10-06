import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmergencyBar } from "./EmergencyBar";

describe("EmergencyBar", () => {
  it("shows the motto and the emergency pill as a call link", () => {
    render(<EmergencyBar />);
    expect(screen.getByText("Same heart. Same care.")).toBeInTheDocument();
    expect(screen.getByText("Always animals first.")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /24\/7 Emergency 593-0404/ });
    expect(link).toHaveAttribute("href", "tel:+2975930404");
  });

  it("accepts custom text and phone", () => {
    render(<EmergencyBar emergencyLabel="Urgencias" phone="111" phoneHref="tel:111" motto={{ text: "A", highlight: "B" }} />);
    expect(screen.getByRole("link", { name: /Urgencias 111/ })).toHaveAttribute("href", "tel:111");
  });
});
