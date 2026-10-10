import type { ProductItem } from "@/lib/products.types";

export type ProductDetailProps = {
  product: ProductItem;
};

export type ProductGalleryProps = {
  name: string;
};

export type ProductInfoProps = {
  product: ProductItem;
};

export type ProductBadgesProps = {
  product: ProductItem;
};

export type ProductSpecsProps = {
  product: ProductItem;
};

export type ProductNoticeProps = {
  product: ProductItem;
};

export type ProductActionsProps = {
  product: ProductItem;
};

export type RelatedProductsProps = {
  products: ProductItem[];
};
