import { StatCard } from "@/components/ui/StatCard";
import { cx } from "@/lib/shared/cx";

import type { StatGridProps, StatGridStyle } from "./StatGrid.types";
import styles from "./StatGrid.module.scss";

/**
 * Stat/Grid: a row of stat cards that share the width. Some cards can be left for desktop only, and the whole grid can be hidden on mobile.
 *
 * @param props Props of the component, see {@link StatGridProps}.
 * @param props.stats Figures to show; those marked `desktopOnly` are hidden below desktop.
 * @param props.columns Number of cards per row from desktop.
 * @param props.mobileHidden Hides the grid on mobile.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function StatGrid({ stats, columns = 4, mobileHidden = false, className, style, ...rest }: StatGridProps) {
  const gridStyle: StatGridStyle = { ...style, "--stat-columns": columns };

  return (
    <div {...rest} className={cx(styles.grid, mobileHidden && styles.mobileHidden, className)} style={gridStyle}>
      {stats.map(({ desktopOnly, ...stat }) => (
        <StatCard key={stat.label} {...stat} className={cx(desktopOnly && styles.desktopOnly)} />
      ))}
    </div>
  );
}
