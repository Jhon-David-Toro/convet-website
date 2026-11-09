import { describe, expect, it } from "vitest";

import { userSchema } from "./users.contract";
import { toCreateUserDto, toCustomerProfile } from "./users.mappers";

describe("toCreateUserDto", () => {
  it("sends only the fields of CreateUserDto, trimmed, with the email in lower case", () => {
    const dto = toCreateUserDto({ firstName: " Anna ", lastName: "Lee", email: " Anna@Example.COM ", phone: " +297 560 1234 ", password: "Violet-Tiger-2026!", confirmPassword: "Violet-Tiger-2026!", acceptTerms: true, whatsappReminders: true });
    expect(dto).toEqual({ firstName: "Anna", lastName: "Lee", email: "anna@example.com", mobileNumber: "+297 560 1234", password: "Violet-Tiger-2026!", acceptedTermsAndPrivacyPolicy: true, whatsappReminders: true });
  });
});

describe("toCustomerProfile", () => {
  it("maps the user and drops what the page does not use", () => {
    const user = userSchema.parse({ idUser: "u1", firstName: "Anna", lastName: "Lee", email: "a@b.co", mobileNumber: "+2975601234", role: "CUSTOMER", passwordHash: "x" });
    expect(user).not.toHaveProperty("passwordHash");
    expect(toCustomerProfile(user)).toEqual({ firstName: "Anna", lastName: "Lee", email: "a@b.co", phone: "+2975601234", address: "" });
  });
});
