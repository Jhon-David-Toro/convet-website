import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Check } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import { CLOSE_LABEL, MARK_ALL_LABEL, NEW_SUFFIX, PANEL_TITLE } from "../NotificationCenter.constants";
import type { PanelHeaderProps } from "../NotificationCenter.types";
import styles from "../NotificationCenter.module.scss";

/**
 * Top of the panel: a back arrow (small screens), the title with how many are new, and the button that marks everything read.
 *
 * @param props Props of the component, see {@link PanelHeaderProps}.
 * @param props.unread How many notifications are unread.
 * @param props.onMarkAllRead Marks every notification read.
 * @param props.onClose Closes the panel.
 * @returns The rendered element.
 */
export function PanelHeader({ unread, onMarkAllRead, onClose }: PanelHeaderProps) {
  return (
    <header className={styles.header}>
      <IconButton icon={ArrowLeft} variant="ghost" label={CLOSE_LABEL} onClick={onClose} className={styles.back} />
      <h2 className={styles.title}>{PANEL_TITLE}</h2>
      {unread > 0 && <Badge tone="accent">{`${unread} ${NEW_SUFFIX}`}</Badge>}
      <Button type="button" variant="tertiary" size="small" leadingIcon={Check} disabled={unread === 0} onClick={onMarkAllRead} className={styles.markAll}>
        {MARK_ALL_LABEL}
      </Button>
    </header>
  );
}
