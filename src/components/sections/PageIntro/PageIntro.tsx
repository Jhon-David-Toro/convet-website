import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";

import type { PageIntroProps } from "./PageIntro.types";
import styles from "./PageIntro.module.scss";

/**
 * Introduction band of a listing page: breadcrumbs plus the section header on the ivory background.
 *
 * @param props Props of the component, see {@link PageIntroProps}.
 * @param props.breadcrumbs Trail from the home page to the current page.
 * @param props.eyebrow Small label above the title.
 * @param props.title Title of the page.
 * @param props.description Sentence under the title.
 * @returns The rendered element.
 */
export function PageIntro({ breadcrumbs, eyebrow, title, description }: PageIntroProps) {
  return (
    <section className={styles.intro}>
      <div className={styles.inner}>
        <Breadcrumbs items={breadcrumbs} />
        <SectionHeader eyebrow={eyebrow} title={title} description={description} titleAs="h1" />
      </div>
    </section>
  );
}
