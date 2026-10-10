import { describe, expect, it } from "vitest";

import { clinicJsonLd, jsonLdText } from "./seo.utils";

describe("seo utils", () => {
  it("describes the clinic for search engines", () => {
    const data = clinicJsonLd();
    expect(data["@type"]).toBe("VeterinaryCare");
    expect(data.address.addressLocality).toBe("Oranjestad");
    expect(data.openingHoursSpecification).toHaveLength(2);
  });

  it("escapes the less-than sign so the data cannot close the script tag", () => {
    expect(jsonLdText({ name: "</script>" })).not.toContain("<");
    expect(JSON.parse(jsonLdText({ name: "a<b" })).name).toBe("a<b");
  });
});
