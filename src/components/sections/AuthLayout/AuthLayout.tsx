import type { AuthLayoutProps } from "./AuthLayout.types";
import { AuthBrandPanel } from "./parts/AuthBrandPanel";
import { AuthMobileTop } from "./parts/AuthMobileTop";
import styles from "./AuthLayout.module.scss";

/**
 * Frame of the authentication pages: the brand panel at the left on desktop and the form centered at the right.
 * Below desktop the panel is replaced by a back arrow and the circular logo.
 *
 * @param props Props of the component, see {@link AuthLayoutProps}.
 * @param props.backHref Page the mobile back arrow leads to.
 * @param props.children Form of the page.
 * @returns The rendered element.
 */
export function AuthLayout({ backHref, children }: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      <AuthBrandPanel />
      <div className={styles.area}>
        <AuthMobileTop backHref={backHref} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
