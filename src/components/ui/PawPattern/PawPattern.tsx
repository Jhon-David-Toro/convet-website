import { Icon, Paw } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "./PawPattern.module.scss";
import { PAW_PATTERN_HEIGHT, PAW_PATTERN_PAWS, PAW_PATTERN_WIDTH } from "./PawPattern.constants";
import type { PawPatternProps } from "./PawPattern.types";

/**
 * Brand/Paw Pattern: navy paw-print watermark at 6%. Decorative: place it behind the content of a section.
 *
 * @param props Props of the component, see {@link PawPatternProps}.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function PawPattern({ className, ...rest }: PawPatternProps) {
  return (
    <div {...rest} aria-hidden="true" className={cx(styles.pattern, className)}>
      {PAW_PATTERN_PAWS.map((paw) => (
        <span
          key={`${paw.x}-${paw.y}`}
          className={styles.paw}
          style={{ left: `${(paw.x / PAW_PATTERN_WIDTH) * 100}%`, top: `${(paw.y / PAW_PATTERN_HEIGHT) * 100}%`, transform: `rotate(${paw.rotate}deg)` }}
        >
          <Icon icon={Paw} size={paw.size} />
        </span>
      ))}
    </div>
  );
}
