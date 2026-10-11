import { CONTACT_LINES, EMERGENCY_LINE } from "../LocationSection.constants";
import { ContactActions } from "./ContactActions";
import { ContactLine } from "./ContactLine";
import styles from "../LocationSection.module.scss";

/**
 * Address, hours, WhatsApp and emergency lines with the contact buttons.
 * A bordered card on desktop; plain content on tablet and mobile.
 *
 * @returns The rendered element.
 */
export function ContactInfo() {
  return (
    <div className={styles.info}>
      <ul className={styles.lines}>
        {[...CONTACT_LINES, EMERGENCY_LINE].map((item) => (
          <ContactLine key={item.id} item={item} />
        ))}
      </ul>
      <ContactActions />
    </div>
  );
}
