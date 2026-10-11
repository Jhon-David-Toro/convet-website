import { SearchInput } from "@/components/ui/SearchInput";

import { SEARCH_LABEL, SEARCH_SHORTCUT } from "../StaffShell.constants";
import type { StaffTopBarStartProps } from "../StaffShell.types";
import { topBarFor } from "../StaffShell.utils";
import { LeadingButton } from "./LeadingButton";
import styles from "../StaffShell.module.scss";

/**
 * Start of the top bar: the search on desktop; below it a back arrow or the menu button with the page title.
 *
 * @param props Props of the component, see {@link StaffTopBarStartProps}.
 * @param props.pathname Path of the current page.
 * @param props.config Configuration of the area.
 * @param props.onMenu Opens the menu.
 * @returns The rendered element.
 */
export function TopBarStart({ pathname, config, onMenu }: StaffTopBarStartProps) {
  const { title, subtitle, backHref } = topBarFor(pathname, config);

  return (
    <>
      <SearchInput label={SEARCH_LABEL} placeholder={SEARCH_LABEL} shortcut={SEARCH_SHORTCUT} className={styles.search} />
      <div className={styles.compact}>
        <LeadingButton backHref={backHref} onMenu={onMenu} />
        <div className={styles.heading}>
          <p className={styles.title}>{title}</p>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
    </>
  );
}
