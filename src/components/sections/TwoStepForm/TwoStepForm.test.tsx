import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { TwoStepForm } from "./TwoStepForm";
import { codeDigits, formatCode, validateCode } from "./TwoStepForm.utils";

const push = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

describe("TwoStepForm", () => {
  beforeEach(() => push.mockClear());

  it("shows the heading and the helper for lost devices", () => {
    render(<TwoStepForm />);
    expect(screen.getByRole("heading", { level: 1, name: "2-step verification" })).toBeInTheDocument();
    expect(screen.getByText(/Lost your device/)).toBeInTheDocument();
  });

  it("groups the digits by three while typing", async () => {
    render(<TwoStepForm />);
    await userEvent.type(screen.getByLabelText("Authentication code"), "482913");
    expect(screen.getByLabelText("Authentication code")).toHaveValue("482 913");
  });

  it("asks for the six digits before submitting", async () => {
    const onSubmit = vi.fn();
    render(<TwoStepForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText("Authentication code"), "48");
    await userEvent.click(screen.getByRole("button", { name: "Verify and continue" }));
    expect(screen.getByText("Enter the 6-digit code.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("sends the digits and the trust choice, then opens the home page", async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    render(<TwoStepForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText("Authentication code"), "482913");
    await userEvent.click(screen.getByRole("checkbox", { name: "Trust this device for 12 hours" }));
    await userEvent.click(screen.getByRole("button", { name: "Verify and continue" }));
    expect(onSubmit).toHaveBeenCalledWith({ code: "482913", trustDevice: true });
    expect(push).toHaveBeenCalledWith("/");
  });

  it("shows an error when the code is rejected", async () => {
    render(<TwoStepForm onSubmit={vi.fn().mockResolvedValue(false)} />);
    await userEvent.type(screen.getByLabelText("Authentication code"), "482913");
    await userEvent.click(screen.getByRole("button", { name: "Verify and continue" }));
    expect(await screen.findByText(/That code is not right/)).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});

describe("two-step utils", () => {
  it("keeps six digits, groups them and validates", () => {
    expect(codeDigits("48 29-13 77")).toBe("482913");
    expect(formatCode("4829")).toBe("482 9");
    expect(validateCode("482 913")).toBeUndefined();
    expect(validateCode("482")).toBeDefined();
  });
});

describe("TwoStepForm without a handler", () => {
  it("accepts a complete code and opens the home page", async () => {
    render(<TwoStepForm />);
    await userEvent.type(screen.getByLabelText("Authentication code"), "482913");
    await userEvent.click(screen.getByRole("button", { name: "Verify and continue" }));
    expect(push).toHaveBeenCalledWith("/");
  });
});
