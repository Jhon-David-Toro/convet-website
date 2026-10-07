import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Radio } from "./Radio";

describe("Radio", () => {
  it("selects one option of a group", async () => {
    render(
      <>
        <Radio name="vet" label="Any available vet" defaultChecked />
        <Radio name="vet" label="Dr. Shirley" />
      </>,
    );
    await userEvent.click(screen.getByRole("radio", { name: "Dr. Shirley" }));
    expect(screen.getByRole("radio", { name: "Dr. Shirley" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Any available vet" })).not.toBeChecked();
  });

  it("links the description for assistive tech", () => {
    render(<Radio name="vet" label="Any available vet" description="We pick the first vet free." />);
    expect(screen.getByRole("radio")).toHaveAccessibleDescription("We pick the first vet free.");
  });
});
