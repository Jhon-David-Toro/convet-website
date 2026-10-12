import type { LegalSectionContent } from "@/lib/site/legal.types";

import { ACTIVE_ROOT_MARGIN, SECTION_ID_PREFIX } from "./LegalPage.constants";
import type { LegalTocItem } from "./LegalPage.types";

/**
 * Id of the element of a section, used by the links of the table of contents.
 *
 * @param index Position of the section, from 0.
 * @returns The id, e.g. "section-3".
 */
export function sectionId(index: number): string {
  return `${SECTION_ID_PREFIX}${index + 1}`;
}

/**
 * Entries of the table of contents of a document: one per section, numbered with two digits.
 *
 * @param sections Sections of the document.
 * @returns The id, number and label of every section.
 */
export function tocItems(sections: LegalSectionContent[]): LegalTocItem[] {
  return sections.map((section, index) => ({ id: sectionId(index), number: String(index + 1).padStart(2, "0"), label: section.heading }));
}

/**
 * Tells which section is being read by watching the headings that cross the upper part of the screen.
 *
 * @param ids Ids of the sections of the page.
 * @param onActive Called with the id of the section that is being read.
 * @returns The cleanup that stops watching.
 */
export function observeSections(ids: string[], onActive: (id: string) => void): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) onActive(visible.target.id);
    },
    { rootMargin: ACTIVE_ROOT_MARGIN },
  );
  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });
  return () => observer.disconnect();
}
