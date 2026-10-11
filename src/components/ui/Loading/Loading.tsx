import { Icon, Loader } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import { LOADING_ICON_SIZE } from "./Loading.constants";
import type { LoadingProps } from "./Loading.types";
import styles from "./Loading.module.scss";

/**
 * Spinner with a message, announced to assistive technology as a live status.
 *
 * @param props Props of the component, see {@link LoadingProps}.
 * @param props.className Extra class name for the root element.
 * @param props.children Visible message; also announced to assistive technology.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Loading({ className, children, ...rest }: LoadingProps) {
  return (
    <div {...rest} role="status" className={cx(styles.loading, className)}>
      <Icon icon={Loader} size={LOADING_ICON_SIZE} tone="brand" className={styles.spinner} />
      <span className={styles.message}>{children}</span>
    </div>
  );
}
