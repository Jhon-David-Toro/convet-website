import { QuickActionCard } from "@/components/patterns/QuickActionCard";
import { cx } from "@/lib/cx";

import styles from "./QuickAccessSection.module.scss";
import { QUICK_ACCESS_ITEMS } from "./QuickAccessSection.constants";

/**
 * Shortcuts to the main areas of the site: services, products, the clinic and the private area.
 *
 * @returns The rendered element.
 */
export function QuickAccessSection() {
  return (
    <nav className={styles.section} aria-label="Quick access">
      <ul className={styles.grid}>
        {QUICK_ACCESS_ITEMS.map(({ id, hiddenOnMobile, ...item }) => (
          <li key={id} className={cx(hiddenOnMobile && styles.hiddenOnMobile)}>
            <QuickActionCard {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
