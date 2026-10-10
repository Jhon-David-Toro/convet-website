import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SERVICES } from "@/lib/services.constants";

import { ServiceDetail } from "./ServiceDetail";
import { ServiceMobileBar } from "./parts/ServiceMobileBar";

const [consultations, vaccinations, treatments] = SERVICES;

describe("ServiceDetail", () => {
  it("describes the service with its steps, table and booking card", () => {
    render(<ServiceDetail service={vaccinations} />);
    expect(screen.getByRole("heading", { level: 1, name: "Vaccinations" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What to expect" })).toBeInTheDocument();
    expect(screen.getByRole("table")).toHaveTextContent("Leptospirosis");
    expect(screen.getByRole("link", { name: /Book vaccination/ })).toHaveAttribute("href", "/book?service=vaccinations");
    expect(screen.getByRole("link", { name: "Ask on WhatsApp" }).getAttribute("href")).toContain("wa.me");
  });

  it("lists the vets and the related services", () => {
    render(<ServiceDetail service={vaccinations} />);
    expect(screen.getByText("Dr. Shirley")).toBeInTheDocument();
    const related = screen.getByRole("heading", { name: "Often booked together" }).closest("section")!;
    expect(within(related).getAllByRole("article")).toHaveLength(2);
  });

  it("skips the table when the service has none", () => {
    render(<ServiceDetail service={consultations} />);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("only offers WhatsApp for services booked by the team", () => {
    render(<ServiceDetail service={treatments} />);
    expect(screen.getByRole("link", { name: "Ask us first" }).getAttribute("href")).toContain("wa.me");
    expect(screen.queryByRole("link", { name: "Ask on WhatsApp" })).not.toBeInTheDocument();
  });
});

describe("ServiceMobileBar", () => {
  it("has a WhatsApp button and the main action", () => {
    render(<ServiceMobileBar service={vaccinations} />);
    expect(screen.getByRole("link", { name: "Chat on WhatsApp" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book vaccination" })).toBeInTheDocument();
  });
});
