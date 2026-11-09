import type { PageIntroProps } from "@/components/sections/PageIntro";

export const REVIEWS_PATH = "/reviews";

export const REVIEWS_INTRO: PageIntroProps = {
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Reviews" }],
  eyebrow: "Reviews",
  title: "What owners say about us",
  description: "Reviews from clients after a visit to CONVET. Our team reads each one and publishes it only once it is approved.",
};
