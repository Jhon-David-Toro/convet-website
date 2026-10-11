import { Alert } from "@/components/ui/Alert";
import { SearchInput } from "@/components/ui/SearchInput";
import { PRODUCT_CATEGORY_OPTIONS, PRODUCT_KIND_OPTIONS, PRODUCT_SPECIES_OPTIONS } from "@/lib/catalog/products.constants";
import { WHATSAPP_HREF } from "@/lib/site/site.constants";

import {
  CATEGORY_TITLE,
  INFO_ACTION_LABEL,
  INFO_TEXT,
  INFO_TITLE,
  SEARCH_LABEL,
  SEARCH_SHORTCUT_HINT,
  SPECIES_TITLE,
  TYPE_TITLE,
} from "../ProductCatalog.constants";
import styles from "../ProductCatalog.module.scss";
import type { ProductSidebarProps } from "../ProductCatalog.types";
import { ProductFilterGroup } from "./ProductFilterGroup";

/**
 * Filters column: search field, the three checkbox groups and the informational alert. On mobile only the search field shows.
 *
 * @param props Props of the component, see {@link ProductSidebarProps}.
 * @param props.filters Current filters.
 * @param props.onQueryChange Replaces the search text.
 * @param props.onToggle Adds or removes a value of a filter group.
 * @param props.searchRef Ref of the search field.
 * @returns The rendered element.
 */
export function ProductSidebar({ filters, onQueryChange, onToggle, searchRef }: ProductSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <SearchInput
        ref={searchRef}
        label={SEARCH_LABEL}
        showLabel={false}
        placeholder={SEARCH_LABEL}
        shortcut={SEARCH_SHORTCUT_HINT}
        value={filters.query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <div className={styles.groups}>
        <ProductFilterGroup title={TYPE_TITLE} group="kinds" options={PRODUCT_KIND_OPTIONS} selected={filters.kinds} onToggle={onToggle} />
        <ProductFilterGroup title={CATEGORY_TITLE} group="categories" options={PRODUCT_CATEGORY_OPTIONS} selected={filters.categories} onToggle={onToggle} />
        <ProductFilterGroup title={SPECIES_TITLE} group="species" options={PRODUCT_SPECIES_OPTIONS} selected={filters.species} onToggle={onToggle} />
      </div>
      <Alert tone="info" title={INFO_TITLE} action={{ label: INFO_ACTION_LABEL, href: WHATSAPP_HREF }} className={styles.info}>
        {INFO_TEXT}
      </Alert>
    </aside>
  );
}
