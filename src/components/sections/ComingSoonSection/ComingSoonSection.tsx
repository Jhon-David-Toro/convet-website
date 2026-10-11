import { COMING_SOON_TEXT } from "./ComingSoonSection.constants";
import type { ComingSoonSectionProps } from "./ComingSoonSection.types";
import styles from "./ComingSoonSection.module.scss";

/**
 * Placeholder for a page that is not ready yet: a title and a coming soon note.
 *
 * @param props Props of the component, see {@link ComingSoonSectionProps}.
 * @param props.title Heading of the page.
 * @returns The rendered element.
 */
export function ComingSoonSection({ title }: ComingSoonSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{COMING_SOON_TEXT}</p>
      </div>
    </section>
  );
}
