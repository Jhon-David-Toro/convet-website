import { Building, ChevronDown, Icon } from "@/components/ui/Icon";

import styles from "../Sidebar.module.scss";
import { SIDEBAR_BRANCH_CHEVRON_SIZE, SIDEBAR_BRANCH_ICON_SIZE } from "../Sidebar.constants";
import type { SidebarBranchProps } from "../Sidebar.types";

/**
 * Button that shows the active branch and opens the branch selector.
 *
 * @param props Props of the component, see {@link SidebarBranchProps}.
 * @param props.branch Name of the active branch.
 * @param props.onClick Called when the element is clicked.
 * @returns The rendered element.
 */
export function SidebarBranch({ branch, onClick }: SidebarBranchProps) {
  return (
    <button type="button" className={styles.branch} onClick={onClick} aria-label={`Branch: ${branch}`}>
      <Icon icon={Building} size={SIDEBAR_BRANCH_ICON_SIZE} tone="secondary" />
      <span className={styles.branchName}>{branch}</span>
      <Icon icon={ChevronDown} size={SIDEBAR_BRANCH_CHEVRON_SIZE} className={styles.chevron} />
    </button>
  );
}
