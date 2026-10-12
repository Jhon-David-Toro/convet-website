import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AlertTriangle, Clock } from "@/components/ui/Icon";

import { LEGAL_CRUMB, TEMPLATE_LABEL, UPDATED_LABEL } from "../LegalPage.constants";
import type { LegalHeroProps } from "../LegalPage.types";
import styles from "../LegalPage.module.scss";

/**
 * Band at the top of a legal page: breadcrumbs, the title, what the document covers and two badges (last update and template notice).
 *
 * @param props Props of the component, see {@link LegalHeroProps}.
 * @param props.title Title of the document.
 * @param props.intro What the document covers.
 * @returns The rendered element.
 */
export function LegalHero({ title, intro }: LegalHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: LEGAL_CRUMB }, { label: title }]} />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.intro}>{intro}</p>
        <div className={styles.badges}>
          <Badge tone="navy" icon={Clock}>
            {UPDATED_LABEL}
          </Badge>
          <Badge tone="warning" icon={AlertTriangle}>
            {TEMPLATE_LABEL}
          </Badge>
        </div>
      </div>
    </section>
  );
}
