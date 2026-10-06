import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Loading } from "./Loading";

describe("Loading", () => {
  it("announces its message as a status", () => {
    render(<Loading>Finding available times…</Loading>);
    expect(screen.getByRole("status")).toHaveTextContent("Finding available times…");
  });
});
