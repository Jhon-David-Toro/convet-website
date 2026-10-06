import Link from "next/link";

import { Logo } from "@/components/ui/Logo";

import styles from "../Footer.module.scss";
import type { FooterBrandProps } from "../Footer.types";
import { FooterMotto } from "./FooterMotto";

/**
 * Logo, about text and optional motto.
 *
 * @param props Props of the component, see {@link FooterBrandProps}.
 * @param props.homeHref Link of the logo; defaults to `/`.
 * @param props.about Short description of the clinic.
 * @param props.motto Brand motto: regular text plus a highlighted phrase.
 * @returns The rendered element.
 */
export function FooterBrand({ homeHref = "/", about, motto }: FooterBrandProps) {
  return (
    <div className={styles.brand}>
      <Link href={homeHref} aria-label="CONVET home" className={styles.logo}>
        <Logo tone="inverse" />
      </Link>
      <p className={styles.about}>{about}</p>
      {motto && <FooterMotto {...motto} />}
    </div>
  );
}
