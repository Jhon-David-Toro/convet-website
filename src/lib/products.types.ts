export type ProductKind = "medication" | "supplement" | "veterinary";

export type ProductCategory = "vaccines" | "parasite" | "pain" | "joint" | "skin";

export type ProductSpecies = "dogs" | "cats";

export type ProductItem = {
  slug: string;
  name: string;
  kind: ProductKind;
  category: ProductCategory;
  species: ProductSpecies[];
  presentation: string;
  summary: string;
  description: string;
  usage: string;
  speciesDetail: string;
  prescription: boolean;
};

export type ProductFilterOption<Value extends string> = {
  value: Value;
  label: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};
