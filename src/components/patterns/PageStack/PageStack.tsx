import { cx } from "@/lib/shared/cx";

import type { PageStackProps } from "./PageStack.types";
import styles from "./PageStack.module.scss";

/**
 * Page/Stack: the blocks of a staff or admin page one under the other, with the vertical rhythm of the design.
 *
 * @param props Props of the component, see {@link PageStackProps}.
 * @param props.className Extra class name for the root element.
 * @param props.children Blocks of the page.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function PageStack({ className, children, ...rest }: PageStackProps) {
  return (
    <div {...rest} className={cx(styles.stack, className)}>
      {children}
    </div>
  );
}
