import Link from "next/link";

import { ArrowRight, Icon } from "@/components/ui/Icon";

import { VIEW_PROFILE_LABEL } from "../VisitRecord.constants";
import type { ProfileLinkProps } from "../VisitRecord.types";
import styles from "../VisitRecord.module.scss";

/**
 * Link to the full record of the patient.
 *
 * @param props Props of the component, see {@link ProfileLinkProps}.
 * @param props.href Address of the patient record.
 * @returns The rendered element.
 */
export function ProfileLink({ href }: ProfileLinkProps) {
  return (
    <Link href={href} className={styles.profileLink}>
      {VIEW_PROFILE_LABEL}
      <Icon icon={ArrowRight} size="small" />
    </Link>
  );
}
