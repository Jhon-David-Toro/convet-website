import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Alert } from "./Alert";

describe("Alert", () => {
  it("shows title and message", () => {
    render(<Alert title="Rabies booster due soon">Luna&apos;s booster is due on Oct 20.</Alert>);
    expect(screen.getByRole("status")).toHaveTextContent("Rabies booster due soon");
    expect(screen.getByRole("status")).toHaveTextContent("Luna's booster is due on Oct 20.");
  });

  it.each([
    ["info", "status"],
    ["success", "status"],
    ["warning", "alert"],
    ["error", "alert"],
  ] as const)("%s tone uses the %s role", (tone, role) => {
    render(<Alert tone={tone} title="Heads up" />);
    expect(screen.getByRole(role)).toBeInTheDocument();
  });

  it("only shows the dismiss button when onDismiss is given", async () => {
    const onDismiss = vi.fn();
    const { rerender } = render(<Alert title="Heads up" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    rerender(<Alert title="Heads up" onDismiss={onDismiss} />);
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("renders the action as a button or as a link", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<Alert title="Heads up" action={{ label: "Book booster", onClick }} />);
    await userEvent.click(screen.getByRole("button", { name: "Book booster" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<Alert title="Heads up" action={{ label: "Book booster", href: "/book" }} />);
    expect(screen.getByRole("link", { name: "Book booster" })).toHaveAttribute("href", "/book");
  });

  it("hides the tone icon from assistive tech", () => {
    const { container } = render(<Alert tone="error" title="Heads up" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
