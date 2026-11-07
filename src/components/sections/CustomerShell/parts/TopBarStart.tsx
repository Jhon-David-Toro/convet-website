import Link from "next/link";

import { ArrowLeft } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { Logo } from "@/components/ui/Logo";

import { BACK_LABEL, greeting, HOME_LABEL } from "../CustomerShell.constants";
import type { CustomerTopBarProps } from "../CustomerShell.types";
import { topBarFor } from "../CustomerShell.utils";
import styles from "../CustomerShell.module.scss";

/**
 * Start of the top bar: the greeting on desktop, and below it a back arrow or the circular logo with the page title.
 *
 * @param props Props of the component, see {@link CustomerTopBarProps}.
 * @param props.pathname Path of the current page.
 * @param props.firstName First name of the signed-in customer.
 * @returns The rendered element.
 */
export function TopBarStart({ pathname, firstName }: CustomerTopBarProps) {
  const { title, backHref } = topBarFor(pathname, firstName);

  return (
    <>
      <p className={styles.greeting}>{greeting(firstName)}</p>
      <div className={styles.compact}>
        {backHref ? (
          <IconButton variant="ghost" icon={ArrowLeft} label={BACK_LABEL} href={backHref} />
        ) : (
          <Link href="/" aria-label={HOME_LABEL}>
            <Logo variant="mark" />
          </Link>
        )}
        <p className={styles.title}>{title}</p>
      </div>
    </>
  );
}
