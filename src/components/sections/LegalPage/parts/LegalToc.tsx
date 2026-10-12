"use client";

import { cx } from "@/lib/shared/cx";

import { TOC_LABEL } from "../LegalPage.constants";
import type { LegalTocProps } from "../LegalPage.types";
import { useActiveSection } from "../hooks/useActiveSection";
import styles from "../LegalPage.module.scss";

/**
 * Table of contents at the side of the page (desktop): a numbered link to every section, the one being read marked as current.
 *
 * @param props Props of the component, see {@link LegalTocProps}.
 * @param props.items Entries of the table of contents.
 * @returns The rendered element.
 */
export function LegalToc({ items }: LegalTocProps) {
  const active = useActiveSection(items.map((item) => item.id));

  return (
    <nav className={styles.toc} aria-label={TOC_LABEL}>
      <p className={styles.tocTitle}>{TOC_LABEL}</p>
      <ol className={styles.tocList}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} className={cx(styles.tocLink, active === item.id && styles.tocActive)}>
              <span className={styles.tocNumber}>{item.number}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
