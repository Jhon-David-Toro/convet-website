import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import { CodeInput } from "./CodeInput";
import { replaceDigits, sanitizeDigits, typedDigits } from "./CodeInput.utils";

/**
 * Controlled code input for the tests.
 *
 * @returns The rendered element.
 */
function Harness() {
  const [value, setValue] = useState("");
  return <CodeInput label="Code" value={value} onValueChange={setValue} />;
}

describe("CodeInput", () => {
  it("renders one box per digit", () => {
    render(<Harness />);
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
    expect(screen.getByRole("group", { name: "Code" })).toBeInTheDocument();
  });

  it("moves forward while typing and ignores letters", async () => {
    render(<Harness />);
    await userEvent.click(screen.getAllByRole("textbox")[0]);
    await userEvent.keyboard("4a81");
    const boxes = screen.getAllByRole("textbox");
    expect(boxes.map((box) => (box as HTMLInputElement).value).join("")).toBe("481");
    expect(boxes[3]).toHaveFocus();
  });

  it("deletes backwards", async () => {
    render(<Harness />);
    await userEvent.click(screen.getAllByRole("textbox")[0]);
    await userEvent.keyboard("48{Backspace}");
    const boxes = screen.getAllByRole("textbox");
    expect(boxes.map((box) => (box as HTMLInputElement).value).join("")).toBe("4");
  });

  it("fills every box when pasting", async () => {
    render(<Harness />);
    await userEvent.click(screen.getAllByRole("textbox")[0]);
    await userEvent.paste("481 902");
    const boxes = screen.getAllByRole("textbox");
    expect(boxes.map((box) => (box as HTMLInputElement).value).join("")).toBe("481902");
  });
});

describe("code utils", () => {
  it("keeps digits only and writes them from a box", () => {
    expect(sanitizeDigits("48 1x9", 6)).toBe("4819");
    expect(replaceDigits({ value: "48", index: 1, digits: "91", length: 6 })).toBe("491");
  });
});

describe("typedDigits", () => {
  it("keeps only the digit that was just typed over an old one", () => {
    expect(typedDigits("12", "1", 6)).toBe("2");
    expect(typedDigits("7", "", 6)).toBe("7");
  });
});
