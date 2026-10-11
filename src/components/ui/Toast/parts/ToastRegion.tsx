import type { ToastRegionProps } from "../Toast.types";
import { ToastRegionItem } from "./ToastRegionItem";
import styles from "../ToastProvider.module.scss";

/**
 * Live region where toasts stack at the bottom; screen readers announce them politely.
 *
 * @param props Props of the component, see {@link ToastRegionProps}.
 * @param props.items Items to render.
 * @param props.controls Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function ToastRegion({ items, ...controls }: ToastRegionProps) {
  return (
    <div className={styles.region} role="region" aria-label="Notifications" aria-live="polite">
      {items.map((item) => (
        <ToastRegionItem key={item.id} item={item} {...controls} />
      ))}
    </div>
  );
}
