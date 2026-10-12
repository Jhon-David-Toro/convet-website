import type { LegalPageProps } from "./LegalPage.types";
import { tocItems } from "./LegalPage.utils";
import { LegalBody } from "./parts/LegalBody";
import { LegalHero } from "./parts/LegalHero";
import { LegalJump } from "./parts/LegalJump";
import { LegalRelated } from "./parts/LegalRelated";
import { LegalToc } from "./parts/LegalToc";
import styles from "./LegalPage.module.scss";

/**
 * Legal page (privacy policy or terms): the hero, a table of contents (a list on small screens), the text of the document and a card to ask questions.
 *
 * @param props Props of the component, see {@link LegalPageProps}.
 * @param props.document Content of the document.
 * @returns The rendered element.
 */
export function LegalPage({ document }: LegalPageProps) {
  const items = tocItems(document.sections);

  return (
    <>
      <LegalHero title={document.title} intro={document.intro} />
      <div className={styles.layout}>
        <LegalToc items={items} />
        <LegalJump items={items} />
        <div className={styles.content}>
          <LegalBody sections={document.sections} />
          <LegalRelated related={document.related} />
        </div>
      </div>
    </>
  );
}
