import { Icon, Star } from "@/components/ui/Icon";
import { REVIEW_RATINGS } from "@/lib/reviews/reviews.constants";
import { starsLabel } from "@/lib/reviews/reviews.utils";
import { cx } from "@/lib/shared/cx";

import { RATING_LABEL } from "../CustomerReviews.constants";
import type { RatingInputProps } from "../CustomerReviews.types";
import styles from "../CustomerReviews.module.scss";

/**
 * Rating of the review form: five radio buttons drawn as stars. Native radios keep the keyboard and screen reader behaviour.
 *
 * @param props Props of the component, see {@link RatingInputProps}.
 * @param props.value Rating picked, 0 when none.
 * @param props.onChange Called with the rating the customer picked.
 * @param props.error Message of the field, when the rating is invalid.
 * @returns The rendered element.
 */
export function RatingInput({ value, onChange, error }: RatingInputProps) {
  return (
    <fieldset className={styles.rating} aria-invalid={error ? true : undefined} aria-describedby={error ? "review-rating-error" : undefined}>
      <legend className={styles.legend}>{RATING_LABEL}</legend>
      <div className={styles.starRow}>
        {REVIEW_RATINGS.map((rating) => {
          const picked = rating <= value;
          return (
            <label key={rating} className={cx(styles.starOption, picked && styles.starPicked)}>
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={value === rating}
                onChange={() => onChange(rating)}
                aria-label={starsLabel(rating)}
                className={styles.starInput}
              />
              <Icon icon={Star} size="medium" tone={picked ? "warning" : "tertiary"} className={cx(picked && styles.filled)} />
            </label>
          );
        })}
      </div>
      {error && (
        <p id="review-rating-error" className={styles.error}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
