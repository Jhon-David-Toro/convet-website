import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageStack } from "./PageStack";

describe("PageStack", () => {
  it("renders its blocks and forwards native attributes", () => {
    render(
      <PageStack data-testid="stack">
        <p>One</p>
        <p>Two</p>
      </PageStack>,
    );
    expect(screen.getByTestId("stack")).toHaveTextContent("OneTwo");
  });
});
