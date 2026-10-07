import styles from "../SectionHeader.module.scss";

/**
 * Orange brush stroke below the title.
 *
 * @returns The rendered element.
 */
export function HeaderUnderline() {
  return (
    <svg className={styles.underline} width="140" height="14" viewBox="0 0 140 14" fill="none" aria-hidden="true">
      <path d="M3 10.0001C35 3.00012 92 1.00012 137 6.00012" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
