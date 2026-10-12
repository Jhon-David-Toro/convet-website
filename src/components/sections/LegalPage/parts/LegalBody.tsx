import { Alert } from "@/components/ui/Alert";
import { Check, Icon } from "@/components/ui/Icon";

import { NOTICE_TEXT, NOTICE_TITLE } from "../LegalPage.constants";
import type { LegalBodyProps } from "../LegalPage.types";
import { sectionId } from "../LegalPage.utils";
import styles from "../LegalPage.module.scss";

/**
 * Text of the document: the placeholder notice and every numbered section with its paragraphs or bullet list.
 *
 * @param props Props of the component, see {@link LegalBodyProps}.
 * @param props.sections Sections of the document.
 * @returns The rendered element.
 */
export function LegalBody({ sections }: LegalBodyProps) {
  return (
    <div className={styles.body}>
      <Alert tone="warning" title={NOTICE_TITLE}>
        {NOTICE_TEXT}
      </Alert>
      {sections.map((section, index) => (
        <section key={section.heading} id={sectionId(index)} className={styles.section}>
          <h2 className={styles.sectionTitle}>{`${index + 1}. ${section.heading}`}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul className={styles.bullets}>
              {section.bullets.map((bullet) => (
                <li key={bullet}>
                  <Icon icon={Check} size="small" tone="brand" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
