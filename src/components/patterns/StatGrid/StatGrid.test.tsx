import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Calendar } from "@/components/ui/Icon";

import { StatGrid } from "./StatGrid";

const stats = [
  { label: "Today", value: 14, caption: "booked", icon: Calendar, tone: "default" as const },
  { label: "Waiting", value: 1, caption: "arrived", icon: Calendar, tone: "default" as const },
];

describe("StatGrid", () => {
  it("renders one card per figure", () => {
    render(<StatGrid stats={stats} />);
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Waiting")).toBeInTheDocument();
  });

  it("keeps every card in the document, even those left for desktop", () => {
    render(<StatGrid stats={[{ ...stats[0], desktopOnly: true }, stats[1]]} columns={2} />);
    expect(screen.getByText("Today")).toBeInTheDocument();
  });
});
