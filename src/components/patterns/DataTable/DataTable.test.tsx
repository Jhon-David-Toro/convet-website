import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TableCell } from "@/components/patterns/Table";

import { DataTable } from "./DataTable";

describe("DataTable", () => {
  it("renders the header row and the rows it is given", () => {
    render(
      <DataTable label="Suppliers" columns={["Supplier", "Phone"]}>
        <tr>
          <TableCell type="strong">Island Pharma</TableCell>
          <TableCell type="mono">+297 583 4422</TableCell>
          <TableCell type="actions" actionLabel="Actions for Island Pharma" />
        </tr>
      </DataTable>,
    );
    expect(screen.getByRole("table", { name: "Suppliers" })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(3);
    expect(screen.getByRole("cell", { name: "Island Pharma" })).toBeInTheDocument();
  });

  it("leaves out the actions column when the rows have none", () => {
    render(
      <DataTable label="Hours" columns={["Day"]} actions={false}>
        <tr>
          <TableCell>Mon</TableCell>
        </tr>
      </DataTable>,
    );
    expect(screen.getAllByRole("columnheader")).toHaveLength(1);
  });
});

describe("DataTable columns", () => {
  it("accepts a column with sorting and calls its handler", async () => {
    const onSort = vi.fn();
    render(
      <DataTable label="Stock" columns={["Product", { label: "On hand", align: "right", sort: "ascending", onSort }]} actions={false}>
        <tr>
          <TableCell>Rabies</TableCell>
          <TableCell type="number">26</TableCell>
        </tr>
      </DataTable>,
    );
    expect(screen.getByRole("columnheader", { name: "On hand" })).toHaveAttribute("aria-sort", "ascending");
    await userEvent.click(screen.getByRole("button", { name: "On hand" }));
    expect(onSort).toHaveBeenCalledOnce();
  });
});
