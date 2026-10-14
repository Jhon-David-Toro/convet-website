import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Header } from "./Header";

const props = {
  links: [
    { label: "Services", href: "/services", active: true },
    { label: "Products", href: "/products" },
  ],
  bookHref: "/book",
  signInHref: "/sign-in",
  whatsappHref: "https://wa.me/2975930404",
};

describe("Header", () => {
  it("is a banner with the emergency bar, the logo link and the main links", () => {
    render(<Header {...props} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /593-0404/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^CONVET/ })).toHaveAttribute("href", "/");
    const main = screen.getByRole("navigation", { name: "Main" });
    expect(main).toHaveTextContent("Services");
    expect(screen.getAllByRole("link", { name: "Services" })[0]).toHaveAttribute("aria-current", "page");
  });

  it("has Book a visit and Sign in as links", () => {
    render(<Header {...props} />);
    expect(screen.getAllByRole("link", { name: "Book a visit" })[0]).toHaveAttribute("href", "/book");
    expect(screen.getAllByRole("link", { name: "Sign in" })[0]).toHaveAttribute("href", "/sign-in");
  });

  it("opens and closes the menu with the button, Escape and a click on a link", async () => {
    render(<Header {...props} />);
    const button = screen.getByRole("button", { name: "Menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Menu" })).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Menu" })).not.toBeInTheDocument();

    await userEvent.click(button);
    await userEvent.click(screen.getByRole("navigation", { name: "Menu" }).querySelector("a") as HTMLElement);
    expect(screen.queryByRole("navigation", { name: "Menu" })).not.toBeInTheDocument();
  });
});
