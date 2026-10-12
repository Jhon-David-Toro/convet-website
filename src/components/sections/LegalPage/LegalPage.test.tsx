import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PRIVACY_DOCUMENT, TERMS_DOCUMENT } from "@/lib/site/legal.constants";

import { LegalPage } from "./LegalPage";
import { sectionId, tocItems } from "./LegalPage.utils";

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
});

describe("LegalPage", () => {
  it("shows the title, the notices and every numbered section", () => {
    render(<LegalPage document={PRIVACY_DOCUMENT} />);
    expect(screen.getByRole("heading", { level: 1, name: "Privacy policy" })).toBeInTheDocument();
    expect(screen.getByText("Template — pending legal review")).toBeInTheDocument();
    expect(screen.getByText("Placeholder legal text")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(9);
    expect(screen.getByRole("heading", { level: 2, name: "2. Information we collect" })).toBeInTheDocument();
  });

  it("links the table of contents to the sections and marks the first as current", () => {
    render(<LegalPage document={TERMS_DOCUMENT} />);
    const link = screen.getByRole("link", { name: /Using the platform/ });
    expect(link).toHaveAttribute("href", "#section-2");
    expect(screen.getByRole("link", { name: /Introduction/ })).toHaveAttribute("aria-current", "location");
  });

  it("links to the other legal document", () => {
    render(<LegalPage document={TERMS_DOCUMENT} />);
    expect(screen.getByRole("link", { name: /Read the privacy policy/ })).toHaveAttribute("href", "/privacy");
  });
});

describe("legal utils", () => {
  it("numbers the sections", () => {
    expect(sectionId(0)).toBe("section-1");
    expect(tocItems(TERMS_DOCUMENT.sections)[8 - 1]).toEqual({ id: "section-8", number: "08", label: "Contact and updates" });
  });
});
