import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Users } from "@/components/ui/Icon";

import { CHANGE_VET_LABEL, ONLY_FREE_TIMES } from "../DateTimePicker.constants";
import type { VetBannerProps } from "../DateTimePicker.types";
import styles from "../DateTimePicker.module.scss";

/**
 * Banner with the vet whose agenda is shown, their weekly schedule and the button that changes the vet.
 *
 * @param props Props of the component, see {@link VetBannerProps}.
 * @param props.vet Vet whose agenda is shown.
 * @param props.onChangeVet Goes back to choose another vet; the button is not shown without it.
 * @returns The rendered element.
 */
export function VetBanner({ vet, onChangeVet }: VetBannerProps) {
  return (
    <div className={styles.banner}>
      <Avatar subject="person" size="small" />
      <div className={styles.bannerText}>
        <p className={styles.bannerTitle}>{`${vet.name} · ${vet.role}`}</p>
        <p className={styles.bannerDetail}>{vet.schedule}</p>
        <p className={styles.bannerDetail}>{ONLY_FREE_TIMES}</p>
      </div>
      {onChangeVet && (
        <Button type="button" variant="tertiary" size="small" leadingIcon={Users} onClick={onChangeVet} className={styles.change}>
          {CHANGE_VET_LABEL}
        </Button>
      )}
    </div>
  );
}
