import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { AdminClients } from "./AdminClients";
import { clientsFor } from "./AdminClients.utils";

describe("AdminClients", () => {
  it("opens the new client dialog", async () => {
    render(<AdminClients />);
    await userEvent.click(screen.getByRole("button", { name: "New client" }));
    expect(screen.getByRole("dialog", { name: "New client" })).toBeInTheDocument();
  });

  it("lists the clients with their accounts and the pagination", () => {
    render(<AdminClients />);
    expect(screen.getByRole("heading", { level: 1, name: "Clients & pets" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(7);
    expect(screen.getByText("Invite pending")).toBeInTheDocument();
    expect(screen.getByText("Showing 1–6 of 1,284")).toBeInTheDocument();
  });

  it("filters by kind of account and by search", async () => {
    render(<AdminClients />);
    await userEvent.click(screen.getByRole("button", { name: /Walk-in only/ }));
    expect(screen.getAllByRole("row")).toHaveLength(3);
    await userEvent.type(screen.getByRole("searchbox"), "carlos");
    expect(screen.getAllByRole("row")).toHaveLength(2);
  });
});

describe("admin clients utils", () => {
  it("combines the chip and the search", () => {
    expect(clientsFor("all", "")).toHaveLength(6);
    expect(clientsFor("linked", "anna")).toHaveLength(1);
    expect(clientsFor("linked", "carlos")).toHaveLength(0);
  });
});
