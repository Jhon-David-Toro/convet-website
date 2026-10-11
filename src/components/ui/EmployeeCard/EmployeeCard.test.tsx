import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmployeeCard } from "./EmployeeCard";

const props = {
  name: "Dr. Shirley",
  role: "Veterinarian · Small animals",
  roleLabel: "Veterinarian",
  services: ["Consultations", "Vaccinations"],
  bookHref: "/book?vet=shirley",
  bookLabel: "Book with Dr. Shirley",
};

describe("EmployeeCard", () => {
  it("shows the name as a heading with the role, label and services", () => {
    render(<EmployeeCard {...props} />);
    expect(screen.getByRole("heading", { level: 3, name: "Dr. Shirley" })).toBeInTheDocument();
    expect(screen.getByText("Veterinarian · Small animals")).toBeInTheDocument();
    expect(screen.getByText("Veterinarian")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("links to booking with this person", () => {
    render(<EmployeeCard {...props} />);
    expect(screen.getByRole("link", { name: "Book with Dr. Shirley" })).toHaveAttribute("href", "/book?vet=shirley");
  });

  it("uses the portrait when there is one", () => {
    render(<EmployeeCard {...props} photo={{ src: "/photos/dr-shirley.jpg", alt: "Dr. Shirley smiling" }} />);
    expect(screen.getByRole("img", { name: "Dr. Shirley smiling" })).toBeInTheDocument();
  });
});

describe("EmployeeCard without services", () => {
  it("leaves the list out when there are no services", () => {
    render(<EmployeeCard {...props} services={[]} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
