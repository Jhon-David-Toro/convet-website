import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthLayout } from "./AuthLayout";

describe("AuthLayout", () => {
  it("frames the page with the brand panel, the back link and the form", () => {
    render(
      <AuthLayout backHref="/sign-in">
        <p>Form</p>
      </AuthLayout>,
    );
    expect(screen.getByRole("main")).toHaveTextContent("Form");
    expect(screen.getAllByRole("link", { name: /Back/ })[0]).toHaveAttribute("href", "/sign-in");
  });
});
