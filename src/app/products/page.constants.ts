import type { PageIntroProps } from "@/components/sections/PageIntro";

export const PRODUCTS_PATH = "/products";

export const PRODUCTS_INTRO: PageIntroProps = {
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Products", href: PRODUCTS_PATH }, { label: "All products" }],
  eyebrow: "Products",
  title: "Medications, supplements & vet products",
  description:
    "What we prescribe, use and recommend at the clinic. Informational only — no online sales. Ask us about availability; prescription medications need a consultation.",
};
