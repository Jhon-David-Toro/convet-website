import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Dog } from "@/components/ui/Icon";

import { OptionCard } from "./OptionCard";

describe("OptionCard", () => {
  it("is a radio named by its title and subtitle", () => {
    render(<OptionCard name="pet" value="luna" icon={Dog} title="Luna" subtitle="Dog · 3 yrs" />);
    expect(screen.getByRole("radio", { name: /Luna/ })).toBeInTheDocument();
    expect(screen.getByText("Dog · 3 yrs")).toBeInTheDocument();
  });

  it("selects exclusively inside its group", async () => {
    render(
      <>
        <OptionCard name="pet" value="luna" icon={Dog} title="Luna" />
        <OptionCard name="pet" value="max" icon={Dog} title="Max" />
      </>,
    );
    await userEvent.click(screen.getByRole("radio", { name: "Luna" }));
    await userEvent.click(screen.getByRole("radio", { name: "Max" }));
    expect(screen.getByRole("radio", { name: "Luna" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "Max" })).toBeChecked();
  });

  it("disabled cannot be selected and meta is shown when given", async () => {
    render(<OptionCard name="svc" value="a" icon={Dog} title="Vaccination" meta="15 min" disabled />);
    await userEvent.click(screen.getByRole("radio"));
    expect(screen.getByRole("radio")).not.toBeChecked();
    expect(screen.getByText("15 min")).toBeInTheDocument();
  });
});
