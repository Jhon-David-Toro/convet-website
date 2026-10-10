import { describe, expect, it } from "vitest";

import { whatsappLink } from "./whatsapp";

describe("whatsappLink", () => {
  it("encodes the message in the clinic chat link", () => {
    expect(whatsappLink("Hi! Is it in stock?")).toBe("https://wa.me/2975930404?text=Hi!%20Is%20it%20in%20stock%3F");
  });
});
