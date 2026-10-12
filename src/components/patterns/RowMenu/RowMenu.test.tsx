import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Eye, Trash } from "@/components/ui/Icon";

import { RowMenu } from "./RowMenu";

const ITEMS = [
  { label: "View record", icon: Eye, href: "/record" },
  { label: "Archive", icon: Trash, href: "/archive", tone: "destructive" as const },
];

describe("RowMenu", () => {
  it("opens the actions from its button and links each one", async () => {
    render(<RowMenu label="Actions for Luna" items={ITEMS} />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Actions for Luna" }));
    expect(screen.getByRole("button", { name: "Actions for Luna" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menuitem", { name: "View record" })).toHaveAttribute("href", "/record");
    expect(screen.getByRole("menuitem", { name: "Archive" })).toHaveAttribute("href", "/archive");
  });

  it("closes with Escape, with a press outside and after choosing an action", async () => {
    render(
      <>
        <RowMenu label="Actions" items={ITEMS} />
        <p>Outside</p>
      </>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await userEvent.click(screen.getByText("Outside"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await userEvent.click(screen.getByRole("menuitem", { name: "View record" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
