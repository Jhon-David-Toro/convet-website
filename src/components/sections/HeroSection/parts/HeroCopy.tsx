import { Badge } from "@/components/ui/Badge";
import { Paw } from "@/components/ui/Icon";
import { ScriptAccent } from "@/components/ui/ScriptAccent";

import styles from "../HeroSection.module.scss";
import { HERO_ACCENT, HERO_BADGE_LABEL, HERO_HEADLINE_LINES, HERO_LEAD, HERO_LEAD_SHORT } from "../HeroSection.constants";

/**
 * Badge, headline, script accent and lead of the hero.
 *
 * @returns The rendered element.
 */
export function HeroCopy() {
  return (
    <>
      <Badge tone="navy" icon={Paw} className={styles.badge}>
        {HERO_BADGE_LABEL}
      </Badge>
      <h1 className={styles.headline}>
        {HERO_HEADLINE_LINES.map((line) => (
          <span key={line} className={styles.line}>
            {line}
          </span>
        ))}
      </h1>
      <ScriptAccent>{HERO_ACCENT}</ScriptAccent>
      <p className={styles.lead}>
        <span className={styles.leadShort}>{HERO_LEAD_SHORT}</span>
        <span className={styles.leadFull}>{HERO_LEAD}</span>
      </p>
    </>
  );
}
