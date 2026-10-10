import type { ProductFilters } from "./ProductCatalog.types";

export const EMPTY_FILTERS: ProductFilters = { query: "", kinds: [], categories: [], species: [] };

export const FIRST_PAGE = 1;

export const SEARCH_SHORTCUT_KEY = "k";

export const SEARCH_SHORTCUT_HINT = "Ctrl K";

export const SEARCH_LABEL = "Search products";

export const TYPE_TITLE = "Product type";

export const CATEGORY_TITLE = "Category";

export const SPECIES_TITLE = "Species";

export const KIND_CHIPS_LABEL = "Filter products by type";

export const ALL_KINDS_LABEL = "All";

export const INFO_TITLE = "Informational catalog";

export const INFO_TEXT = "We don't sell online. Message us to check availability.";

export const INFO_ACTION_LABEL = "WhatsApp us";

export const EMPTY_TITLE = "No products found";

export const EMPTY_MESSAGE = "Try another search or clear some filters.";

export const ASK_LABEL = "Ask about availability";
