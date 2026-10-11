import Link from "next/link";

import { ArrowLeft } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { Logo } from "@/components/ui/Logo";

import { BACK_LABEL, GREETING, HOME_LABEL } from "../CustomerShell.constants";
import styles from "../CustomerShell.module.scss";
import type { CustomerPathProps } from "../CustomerShell.types";
import { topBarFor } from "../CustomerShell.utils";

/**
 * Start of the top bar: the greeting on desktop, and below it a back arrow or the circular logo with the page title.
 *
 * @param props Props of the component, see {@link CustomerPathProps}.
 * @param props.pathname Path of the current page.
 * @returns The rendered element.
 */
export function TopBarStart({ pathname }: CustomerPathProps) {
  const { title, backHref } = topBarFor(pathname);

  return (
    <>
      <p className={styles.greeting}>{GREETING}</p>
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
