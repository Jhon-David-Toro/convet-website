import type { LegalDocument } from "@/lib/site/legal.types";

export type LegalPageProps = {
  document: LegalDocument;
};

export type LegalTocItem = {
  id: string;
  number: string;
  label: string;
};

export type LegalTocProps = {
  items: LegalTocItem[];
};

export type LegalHeroProps = Pick<LegalDocument, "title" | "intro">;

export type LegalBodyProps = Pick<LegalDocument, "sections">;

export type LegalRelatedProps = {
  related: LegalDocument["related"];
};
