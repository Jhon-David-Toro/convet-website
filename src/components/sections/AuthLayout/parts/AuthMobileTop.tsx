import Link from "next/link";

import { ArrowLeft } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { Logo } from "@/components/ui/Logo";

import { BACK_LABEL, HOME_LABEL } from "../AuthLayout.constants";
import styles from "../AuthLayout.module.scss";
import type { AuthMobileTopProps } from "../AuthLayout.types";

/**
 * Top of the auth pages below desktop: a back arrow and the circular logo.
 *
 * @param props Props of the component, see {@link AuthMobileTopProps}.
 * @param props.backHref Page the back arrow leads to.
 * @returns The rendered element.
 */
export function AuthMobileTop({ backHref }: AuthMobileTopProps) {
  return (
    <div className={styles.top}>
      <IconButton variant="ghost" icon={ArrowLeft} label={BACK_LABEL} href={backHref} />
      <Link href="/" aria-label={HOME_LABEL} className={styles.mark}>
        <Logo variant="mark" />
      </Link>
    </div>
  );
}
