import { SUBTITLE, TITLE } from "../ProfileSettings.constants";
import styles from "../ProfileSettings.module.scss";

/**
 * Title of the page (the only `h1`) and the sentence under it.
 *
 * @returns The rendered element.
 */
export function ProfileHeading() {
  return (
    <header className={styles.heading}>
      <h1 className={styles.title}>{TITLE}</h1>
      <p className={styles.subtitle}>{SUBTITLE}</p>
    </header>
  );
}
