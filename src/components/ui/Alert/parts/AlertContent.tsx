import type { AlertContentProps } from "../Alert.types";
import { AlertAction } from "./AlertAction";
import styles from "../Alert.module.scss";

/**
 * Title, optional message and optional action.
 *
 * @param props Props of the component, see {@link AlertContentProps}.
 * @param props.title Title text.
 * @param props.action Highlighted action below the message: a link (`href`) or a button (`onClick`).
 * @param props.children Content of the element.
 * @returns The rendered element.
 */
export function AlertContent({ title, action, children }: AlertContentProps) {
  return (
    <div className={styles.content}>
      <p className={styles.title}>{title}</p>
      {children && <p className={styles.message}>{children}</p>}
      {action && <AlertAction action={action} />}
    </div>
  );
}
