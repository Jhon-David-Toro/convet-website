import type { PageIntroProps } from "@/components/sections/PageIntro";

export const SERVICES_PATH = "/services";

export const SERVICES_INTRO: PageIntroProps = {
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Services", href: SERVICES_PATH }, { label: "All services" }],
  eyebrow: "Services",
  title: "Care for every stage of your pet's life",
  description: "Book online in under a minute. Prices are confirmed at the clinic; no online payment is needed.",
};
