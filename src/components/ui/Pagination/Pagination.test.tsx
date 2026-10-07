import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("shows the summary and the page window from Figma (1 2 3 … 25)", () => {
    render(<Pagination page={1} pageCount={25} total={248} hrefForPage={(n) => `/p/${n}`} />);
    expect(screen.getByText("Showing 1–10 of 248")).toBeInTheDocument();
    ["Page 1", "Page 2", "Page 3", "Page 25"].forEach((name) => expect(screen.getByRole("link", { name })).toBeInTheDocument());
    expect(screen.getByRole("link", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Page 4" })).not.toBeInTheDocument();
  });

  it("clips the summary on the last page", () => {
    render(<Pagination page={25} pageCount={25} total={248} hrefForPage={(n) => `/p/${n}`} />);
    expect(screen.getByText("Showing 241–248 of 248")).toBeInTheDocument();
  });

  it("disables previous on the first page and next on the last", () => {
    const { rerender } = render(<Pagination page={1} pageCount={5} hrefForPage={(n) => `/p/${n}`} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("link", { name: "Next page" })).toHaveAttribute("href", "/p/2");
    rerender(<Pagination page={5} pageCount={5} hrefForPage={(n) => `/p/${n}`} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("works with buttons and reports the chosen page", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} pageCount={5} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Page 4" }));
    expect(onPageChange).toHaveBeenLastCalledWith(4);
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);
  });

  it("is a labelled navigation", () => {
    render(<Pagination page={1} pageCount={3} onPageChange={() => {}} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
  });
});
