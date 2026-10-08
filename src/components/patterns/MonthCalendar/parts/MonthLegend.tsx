import styles from "../MonthCalendar.module.scss";
import type { MonthLegendProps } from "../MonthCalendar.types";

/**
 * Legend entries below the grid.
 *
 * @param props Props of the component, see {@link MonthLegendProps}.
 * @param props.items Items to render.
 * @returns The rendered element.
 */
export function MonthLegend({ items }: MonthLegendProps) {
  return (
    <p className={styles.legend}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </p>
  );
}
