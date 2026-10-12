export type LegalSectionContent = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  intro: string;
  sections: LegalSectionContent[];
  related: { label: string; href: string; note: string };
};
