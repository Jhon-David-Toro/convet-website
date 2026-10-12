import { Button } from "@/components/ui/Button";
import { ArrowRight, WhatsApp } from "@/components/ui/Icon";
import { WHATSAPP_HREF } from "@/lib/site/site.constants";

import { QUESTIONS_TITLE, WHATSAPP_LABEL } from "../LegalPage.constants";
import type { LegalRelatedProps } from "../LegalPage.types";
import styles from "../LegalPage.module.scss";

/**
 * Card at the end of a legal page: where to ask questions (WhatsApp) and a link to the other legal document.
 *
 * @param props Props of the component, see {@link LegalRelatedProps}.
 * @param props.related Label, link and note of the other legal document.
 * @returns The rendered element.
 */
export function LegalRelated({ related }: LegalRelatedProps) {
  return (
    <aside className={styles.related}>
      <div className={styles.relatedText}>
        <p className={styles.relatedTitle}>{QUESTIONS_TITLE}</p>
        <p className={styles.relatedNote}>{related.note}</p>
      </div>
      <div className={styles.relatedActions}>
        <Button href={WHATSAPP_HREF} variant="secondary" size="small" leadingIcon={WhatsApp} leadingIconTone="whatsapp">
          {WHATSAPP_LABEL}
        </Button>
        <Button href={related.href} variant="tertiary" size="small" trailingIcon={ArrowRight}>
          {related.label}
        </Button>
      </div>
    </aside>
  );
}
