import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tooltip } from "./Tooltip";
import { TooltipContent } from "./TooltipContent";

describe("Tooltip", () => {
  it("appears on hover and describes the trigger", async () => {
    render(
      <Tooltip content="Pick a time to continue">
        <button type="button">Confirm</button>
      </Tooltip>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    await userEvent.hover(screen.getByRole("button"));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Pick a time to continue");
    expect(screen.getByRole("button")).toHaveAccessibleDescription("Pick a time to continue");
    await userEvent.unhover(screen.getByRole("button"));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("appears with keyboard focus and closes with Escape", async () => {
    render(
      <Tooltip content="Pick a time to continue" placement="bottom">
        <button type="button">Confirm</button>
      </Tooltip>,
    );
    await userEvent.tab();
    expect(screen.getByRole("tooltip")).toHaveAttribute("data-placement", "bottom");
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("stays while the pointer moves onto the tooltip itself", async () => {
    render(
      <Tooltip content="Pick a time to continue">
        <button type="button">Confirm</button>
      </Tooltip>,
    );
    await userEvent.hover(screen.getByRole("button"));
    await userEvent.hover(screen.getByRole("tooltip"));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});

describe("TooltipContent", () => {
  it("renders standalone with its placement", () => {
    render(<TooltipContent placement="bottom">Pick a time to continue</TooltipContent>);
    expect(screen.getByRole("tooltip")).toHaveAttribute("data-placement", "bottom");
  });
});

describe("Tooltip focus", () => {
  it("hides when the trigger loses focus, and Escape does nothing while it is hidden", async () => {
    render(
      <Tooltip content="Pick a time to continue">
        <button type="button">Confirm</button>
      </Tooltip>,
    );
    await userEvent.keyboard("{Escape}");
    await userEvent.tab();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    await userEvent.tab();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
