import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { STAFF_CLIENT } from "@/lib/staff.constants";

import { ClientDetail } from "./ClientDetail";
import { contactLines } from "./ClientDetail.utils";

describe("ClientDetail", () => {
  it("shows the client, their pets and their appointments", () => {
    render(<ClientDetail client={STAFF_CLIENT} />);
    expect(screen.getByRole("heading", { level: 1, name: "Anna Lee" })).toBeInTheDocument();
    expect(screen.getByText("Online account linked")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Luna/ })).toHaveAttribute("href", "/staff/patients/luna");
    expect(screen.getAllByText("Consultation · Luna")).toHaveLength(2);
    expect(screen.getByRole("link", { name: /Reschedule/ })).toBeInTheDocument();
  });
});

describe("client detail utils", () => {
  it("lists the phone, the email and the client-since date", () => {
    expect(contactLines(STAFF_CLIENT).map((line) => line.text)).toEqual(["+297 560 1234", "anna@example.com", "Client since Mar 2023"]);
  });
});
