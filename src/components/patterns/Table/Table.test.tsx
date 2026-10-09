import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TableCell, TableHeaderCell } from "./Table";

const inTable = (header: React.ReactNode, cells: React.ReactNode) => (
  <table>
    <thead>
      <tr>{header}</tr>
    </thead>
    <tbody>
      <tr>{cells}</tr>
    </tbody>
  </table>
);

describe("TableHeaderCell", () => {
  it("is a column header with aria-sort when sortable", () => {
    render(inTable(<TableHeaderCell sort="ascending">Stock</TableHeaderCell>, null));
    expect(screen.getByRole("columnheader", { name: "Stock" })).toHaveAttribute("aria-sort", "ascending");
  });

  it("becomes a button that sorts when onSort is given", async () => {
    const onSort = vi.fn();
    render(inTable(<TableHeaderCell sort="none" onSort={onSort}>Stock</TableHeaderCell>, null));
    await userEvent.click(screen.getByRole("button", { name: "Stock" }));
    expect(onSort).toHaveBeenCalledOnce();
  });

  it("is not interactive without onSort", () => {
    render(inTable(<TableHeaderCell>Name</TableHeaderCell>, null));
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("TableCell", () => {
  it("renders text-like types", () => {
    render(inTable(null, <TableCell type="mono">900164001234567</TableCell>));
    expect(screen.getByRole("cell", { name: "900164001234567" })).toBeInTheDocument();
  });

  it("avatar type shows the value, the secondary line and a decorative avatar", () => {
    const { container } = render(
      inTable(
        null,
        <TableCell type="avatar" avatar="dog" secondary="Owner: Anna">
          Luna
        </TableCell>,
      ),
    );
    expect(screen.getByText("Luna")).toBeInTheDocument();
    expect(screen.getByText("Owner: Anna")).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("actions type has an accessible button", async () => {
    const onAction = vi.fn();
    render(inTable(null, <TableCell type="actions" actionLabel="Row actions" onAction={onAction} />));
    await userEvent.click(screen.getByRole("button", { name: "Row actions" }));
    expect(onAction).toHaveBeenCalledOnce();
  });
});
