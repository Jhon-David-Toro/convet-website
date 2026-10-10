import { PRODUCT_CATEGORY_LABELS, PRODUCT_KIND_LABELS, PRODUCTS, RELATED_PRODUCTS_COUNT } from "./products.constants";
import type { ProductItem, ProductSpec } from "./products.types";
import { SERVICES } from "./services.constants";
import type { ServiceItem } from "./services.types";
import { whatsappLink } from "./whatsapp";

/**
 * Finds a product by its URL segment.
 *
 * @param slug URL segment of the product.
 * @returns The product, or `undefined` when there is none.
 */
export function findProduct(slug: string): ProductItem | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

/**
 * Products to suggest next to one: same category first, then the rest of the catalog.
 *
 * @param product Product the suggestions are for.
 * @returns Up to `RELATED_PRODUCTS_COUNT` other products.
 */
export function relatedProducts(product: ProductItem): ProductItem[] {
  const others = PRODUCTS.filter((candidate) => candidate.slug !== product.slug);
  const sameCategory = others.filter((candidate) => candidate.category === product.category);
  const rest = others.filter((candidate) => candidate.category !== product.category);
  return [...sameCategory, ...rest].slice(0, RELATED_PRODUCTS_COUNT);
}

/**
 * Eyebrow of a product: its kind and category, e.g. "Medication · Vaccines".
 *
 * @param product Product to describe.
 * @returns The eyebrow text.
 */
export function productCategoryLine(product: ProductItem): string {
  return `${PRODUCT_KIND_LABELS[product.kind]} · ${PRODUCT_CATEGORY_LABELS[product.category]}`;
}

/**
 * Link of the detail page of a product.
 *
 * @param product Product to open.
 * @returns The detail link.
 */
export function productDetailHref(product: ProductItem): string {
  return `/products/${product.slug}`;
}

/**
 * Link that opens WhatsApp asking whether a product is available.
 *
 * @param product Product to ask about.
 * @returns The WhatsApp link with the prefilled question.
 */
export function productWhatsappHref(product: ProductItem): string {
  return whatsappLink(productAvailabilityMessage(product));
}

/**
 * Message the WhatsApp link of a product starts with.
 *
 * @param product Product to ask about.
 * @returns The prefilled question.
 */
export function productAvailabilityMessage(product: ProductItem): string {
  return `Hi! Is the ${product.name} available?`;
}

/**
 * Rows of the specs table of a product.
 *
 * @param product Product to describe.
 * @returns The specs, in display order.
 */
export function productSpecs(product: ProductItem): ProductSpec[] {
  return [
    { label: "Presentation", value: product.presentation },
    { label: "Species", value: product.speciesDetail },
    { label: "How it is given", value: product.usage },
    { label: "Prescription", value: product.prescription ? "Requires a vet consultation" : "Not required" },
  ];
}

/**
 * Service a visitor can book to get a product: vaccines come with a vaccination, other prescription products with a consultation.
 *
 * @param product Product the visitor is looking at.
 * @returns The matching service, or `undefined` for products that need no visit.
 */
export function productService(product: ProductItem): ServiceItem | undefined {
  const slug = product.category === "vaccines" ? "vaccinations" : "consultations";
  return product.prescription ? SERVICES.find((service) => service.slug === slug) : undefined;
}
