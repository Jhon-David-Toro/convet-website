import styles from "../Footer.module.scss";
import type { FooterColumnProps } from "../Footer.types";
import { FooterItem } from "./FooterItem";

/**
 * A titled column of links.
 *
 * @param props Props of the component, see {@link FooterColumnProps}.
 * @param props.column Column of links with its heading.
 * @returns The rendered element.
 */
export function FooterColumn({ column }: FooterColumnProps) {
  return (
    <nav aria-label={column.heading} className={styles.column}>
      <p className={styles.heading}>{column.heading}</p>
      <ul className={styles.items}>
        {column.items.map((item) => (
          <li key={item.label}>
            <FooterItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
