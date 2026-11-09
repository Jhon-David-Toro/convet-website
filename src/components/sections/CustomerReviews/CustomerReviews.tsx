"use client";

import { useState } from "react";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Alert } from "@/components/ui/Alert";
import { useToast } from "@/components/ui/Toast";
import type { ActionResult } from "@/lib/api/api.types";
import type { MyReviewDto } from "@/lib/api/reviews.contract";
import type { CompletedVisit, ReviewFormValues } from "@/lib/reviews/reviews.types";

import {
  CREATED_MESSAGE,
  LOAD_ERROR_TITLE,
  REVIEWS_EMPTY,
  REVIEWS_TITLE,
  SAVE_ERROR_TITLE,
  SUBTITLE,
  TITLE,
  UPDATED_MESSAGE,
  VISITS_EMPTY,
  VISITS_TITLE,
} from "./CustomerReviews.constants";
import type { CustomerReviewsProps, ReviewFormTarget } from "./CustomerReviews.types";
import styles from "./CustomerReviews.module.scss";
import { ReviewCard } from "./parts/ReviewCard";
import { ReviewFormModal } from "./parts/ReviewFormModal";
import { VisitCard } from "./parts/VisitCard";

/**
 * Reviews page of the customer area: the completed visits still to review, the reviews already written (each one can be changed),
 * and the review form in a dialog. Saving shows a toast; a failure stays in the dialog.
 *
 * @param props Props of the component, see {@link CustomerReviewsProps}.
 * @param props.visits Completed visits without a review.
 * @param props.reviews Reviews the customer has written.
 * @param props.loadError Message shown instead of the lists when they could not be loaded.
 * @param props.actions Server Actions that save a new review or change one.
 * @returns The rendered element.
 */
export function CustomerReviews({ visits = [], reviews = [], loadError, actions }: CustomerReviewsProps) {
  const [target, setTarget] = useState<ReviewFormTarget>();
  const { toast } = useToast();

  async function save(values: ReviewFormValues): Promise<ActionResult> {
    if (!target) return { ok: false, kind: "server", message: SAVE_ERROR_TITLE };

    const result = await performAction(target, values);
    if (result.ok) {
      const message = target.mode === "create" ? CREATED_MESSAGE : UPDATED_MESSAGE;
      toast({ message, tone: "success" });
    }
    return result;
  }

  function performAction(target: ReviewFormTarget, values: ReviewFormValues) {
    return target.mode === "create"
      ? actions.create(target.visit.appointmentId, values)
      : actions.update(target.review.idReview, values);
  }

  return (
    <PageStack>
      <PageHeader title={TITLE} subtitle={SUBTITLE} />
      {loadError ? (
        <Alert tone="error" title={LOAD_ERROR_TITLE}>
          {loadError}
        </Alert>
      ) : (
        <>
          <section className={styles.section} aria-labelledby="visits-heading">
            <h2 id="visits-heading" className={styles.sectionTitle}>
              {VISITS_TITLE}
            </h2>
            {visits.length === 0 ? (
              <p className={styles.empty}>{VISITS_EMPTY}</p>
            ) : (
              <ul className={styles.list}>
                {visits.map((visit: CompletedVisit) => (
                  <li key={visit.appointmentId}>
                    <VisitCard visit={visit} onReview={(picked) => setTarget({ mode: "create", visit: picked })} />
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className={styles.section} aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className={styles.sectionTitle}>
              {REVIEWS_TITLE}
            </h2>
            {reviews.length === 0 ? (
              <p className={styles.empty}>{REVIEWS_EMPTY}</p>
            ) : (
              <ul className={styles.list}>
                {reviews.map((review: MyReviewDto) => (
                  <li key={review.idReview}>
                    <ReviewCard review={review} onEdit={(picked) => setTarget({ mode: "edit", review: picked })} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
      {target && <ReviewFormModal key={target.mode === "create" ? target.visit.appointmentId : target.review.idReview} target={target} onSave={save} onClose={() => setTarget(undefined)} />}
    </PageStack>
  );
}
