import { EmergencyCard } from "@/components/patterns/EmergencyCard";
import { QuickActionCard } from "@/components/patterns/QuickActionCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Home, Icon, Paw } from "@/components/ui/Icon";
import { PawPattern } from "@/components/ui/PawPattern";
import { HERO_EMERGENCY } from "@/components/sections/HeroSection/HeroSection.constants";

import { EMERGENCY_LABEL, ERROR_BADGE, HOME_LABEL, MESSAGE, POPULAR_PAGES, POPULAR_TITLE, TEAM_NOTE, TITLE } from "./NotFoundSection.constants";
import { GoBackButton } from "./parts/GoBackButton";
import styles from "./NotFoundSection.module.scss";

/**
 * Page shown when an address does not exist: a big 404, what happened, buttons to go home or back, the popular pages and the emergency number.
 *
 * @returns The rendered element.
 */
export function NotFoundSection() {
  return (
    <>
      <section className={styles.hero}>
        <PawPattern className={styles.pattern} />
        <div className={styles.heroInner}>
          <div className={styles.code} aria-hidden="true">
            <span className={styles.digits}>404</span>
            <span className={styles.paw}>
              <Icon icon={Paw} size="large" />
            </span>
          </div>
          <div className={styles.text}>
            <Badge tone="navy">{ERROR_BADGE}</Badge>
            <h1 className={styles.title}>{TITLE}</h1>
            <p className={styles.message}>{MESSAGE}</p>
            <div className={styles.actions}>
              <Button href="/" leadingIcon={Home}>
                {HOME_LABEL}
              </Button>
              <GoBackButton />
            </div>
            <p className={styles.note}>{TEAM_NOTE}</p>
          </div>
        </div>
      </section>
      <section className={styles.popular} aria-labelledby="popular-title">
        <h2 id="popular-title" className={styles.popularTitle}>
          {POPULAR_TITLE}
        </h2>
        <ul className={styles.grid}>
          {POPULAR_PAGES.map((page) => (
            <li key={page.href}>
              <QuickActionCard {...page} />
            </li>
          ))}
        </ul>
        <EmergencyCard aria-label={EMERGENCY_LABEL} {...HERO_EMERGENCY} />
      </section>
    </>
  );
}
