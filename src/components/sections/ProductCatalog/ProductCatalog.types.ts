import type { RefObject } from "react";

import type {
  ProductCategory,
  ProductFilterOption,
  ProductItem,
  ProductKind,
  ProductSpecies,
} from "@/lib/catalog/products.types";

export type ProductCatalogProps = {
  products: ProductItem[];
};

export type ProductFilters = {
  query: string;
  kinds: ProductKind[];
  categories: ProductCategory[];
  species: ProductSpecies[];
};

export type ProductFilterGroupName = Exclude<keyof ProductFilters, "query">;

export type ProductKindCounts = Record<ProductKind, number>;

export type UseProductFiltersParams = {
  onChange: () => void;
};

export type ProductFiltersState = {
  filters: ProductFilters;
  setQuery: (query: string) => void;
  toggle: (group: ProductFilterGroupName, value: string) => void;
  selectKind: (kind?: ProductKind) => void;
};

export type UseProductCatalogParams = {
  products: ProductItem[];
};

export type ProductCatalogState = ProductFiltersState & {
  visible: ProductItem[];
  total: number;
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
  kindCounts: ProductKindCounts;
};

export type ProductSidebarProps = {
  filters: ProductFilters;
  onQueryChange: ProductFiltersState["setQuery"];
  onToggle: ProductFiltersState["toggle"];
  searchRef: RefObject<HTMLInputElement | null>;
};

export type ProductFilterGroupProps = {
  title: string;
  group: ProductFilterGroupName;
  options: ProductFilterOption<string>[];
  selected: string[];
  onToggle: ProductFiltersState["toggle"];
};

export type ProductToolbarProps = {
  kinds: ProductKind[];
  kindCounts: ProductKindCounts;
  total: number;
  onSelectKind: ProductFiltersState["selectKind"];
};

export type ProductResultsProps = {
  catalog: ProductCatalogState;
};

export type KindChipsProps = Pick<ProductToolbarProps, "kinds" | "kindCounts" | "onSelectKind">;

export type ProductGridProps = {
  products: ProductItem[];
};
