import { describe, expect, it } from "vitest";

import { breadcrumbJsonLd, clinicJsonLd, jsonLdText, pageMetadata, serviceJsonLd } from "./seo.utils";

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

describe("page SEO", () => {
  it("gives a page its own title, canonical address and share cards instead of the home page's", () => {
    const meta = pageMetadata({ title: "Services", description: "What we do.", path: "/services" });
    expect(meta.title).toBe("Services · CONVET");
    expect(meta.alternates?.canonical).toBe("/services");
    expect(meta.openGraph).toMatchObject({ title: "Services · CONVET", description: "What we do.", url: "/services" });
    expect(meta.twitter).toMatchObject({ title: "Services · CONVET", description: "What we do." });
  });

  it("describes a service and its breadcrumb with absolute addresses", () => {
    const service = serviceJsonLd({ name: "Vaccinations", description: "Protect your pet.", path: "/services/vaccinations" });
    expect(service["@type"]).toBe("Service");
    expect(service.url).toMatch(/^https:\/\/.+\/services\/vaccinations$/);
    expect(service.provider["@type"]).toBe("VeterinaryCare");
    const crumbs = breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]);
    expect(crumbs.itemListElement.map((item) => item.position)).toEqual([1, 2]);
    expect(crumbs.itemListElement[1].item).toMatch(/^https:\/\/.+\/services$/);
  });
});
