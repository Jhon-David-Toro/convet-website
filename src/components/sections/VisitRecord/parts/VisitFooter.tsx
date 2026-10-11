import { Button } from "@/components/ui/Button";
import { Check, Icon, Lock } from "@/components/ui/Icon";

import { FINISH_LABEL, SAVE_DRAFT_LABEL } from "../VisitRecord.constants";
import styles from "../VisitRecord.module.scss";
import type { VisitFooterProps } from "../VisitRecord.types";

/**
 * Bar fixed to the bottom of the visit form: when the draft was last saved, the button that saves it and the one that signs the visit.
 *
 * @param props Props of the component, see {@link VisitFooterProps}.
 * @param props.draftSaved Text that says when the draft was saved.
 * @param props.saveDraft Saves the draft.
 * @param props.finish Signs the visit.
 * @returns The rendered element.
 */
export function VisitFooter({ draftSaved, saveDraft, finish }: VisitFooterProps) {
  return (
    <div className={styles.footer}>
      <p className={styles.draft}>
        <Icon icon={Check} size="small" tone="brand" />
        {draftSaved}
      </p>
      <div className={styles.footerActions}>
        <Button type="button" variant="secondary" onClick={saveDraft}>
          {SAVE_DRAFT_LABEL}
        </Button>
        <Button type="button" leadingIcon={Lock} onClick={finish}>
          {FINISH_LABEL}
        </Button>
      </div>
    </div>
  );
}
