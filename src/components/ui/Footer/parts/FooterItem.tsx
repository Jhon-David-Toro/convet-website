import Link from "next/link";

import { cx } from "@/lib/shared/cx";

import styles from "../Footer.module.scss";
import type { FooterLink } from "../Footer.types";

/**
 * A link of a column; without `href` it is plain text.
 *
 * @param props Props of the component, see {@link FooterLink}.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.href Link destination.
 * @param props.highlight Highlights the link in orange (e.g. the emergency line).
 * @returns The rendered element.
 */
export function FooterItem({ label, href, highlight }: FooterLink) {
  const className = cx(styles.link, highlight && styles.highlight);

  return href ? (
    <Link href={href} className={className}>
      {label}
    </Link>
  ) : (
    <span className={className}>{label}</span>
  );
}
