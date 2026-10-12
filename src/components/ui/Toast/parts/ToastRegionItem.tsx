import { Toast } from "../Toast";
import type { ToastRegionItemProps } from "../Toast.types";
import { isMousePointer, toastDuration } from "../Toast.utils";
import styles from "../ToastProvider.module.scss";

/**
 * One toast of the region: pauses its countdown while a mouse or the focus is on it, and can be closed.
 *
 * @param props Props of the component, see {@link ToastRegionItemProps}.
 * @param props.item Item to render.
 * @param props.dismiss Dismisses a toast by id.
 * @param props.schedule Starts (or restarts) the countdown that dismisses a toast.
 * @param props.pause Stops the countdown of a toast, e.g. while the pointer is over it.
 * @returns The rendered element.
 */
export function ToastRegionItem({ item, dismiss, schedule, pause }: ToastRegionItemProps) {
  /**
   * Restarts the countdown of the toast.
   */
  const resume = () => schedule(item.id, toastDuration(item));
  /**
   * Runs the action of the toast and dismisses it.
   */
  const runAction = () => {
    item.action?.onClick();
    dismiss(item.id);
  };

  return (
    <Toast
      tone={item.tone}
      className={styles.item}
      actionLabel={item.action?.label}
      onAction={runAction}
      onDismiss={() => dismiss(item.id)}
      onPointerEnter={(event) => isMousePointer(event) && pause(item.id)}
      onPointerLeave={(event) => isMousePointer(event) && resume()}
      onFocus={() => pause(item.id)}
      onBlur={resume}
    >
      {item.message}
    </Toast>
  );
}
