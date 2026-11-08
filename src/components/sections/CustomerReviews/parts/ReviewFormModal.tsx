import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import { REVIEW_COMMENT_MAX } from "@/lib/reviews/reviews.constants";
import { visitTitle } from "@/lib/reviews/reviews.utils";

import {
  CANCEL_LABEL,
  COMMENT_HELPER,
  COMMENT_ID,
  COMMENT_LABEL,
  CREATE_SUBMIT,
  CREATE_TITLE,
  EDIT_NOTE,
  EDIT_SUBMIT,
  EDIT_TITLE,
  FORM_ID,
  SAVE_ERROR_TITLE,
  SAVING_LABEL,
} from "../CustomerReviews.constants";
import type { ReviewFormModalProps } from "../CustomerReviews.types";
import { useReviewForm } from "../hooks/useReviewForm";
import styles from "../CustomerReviews.module.scss";
import { RatingInput } from "./RatingInput";

/**
 * Dialog with the review form: the rating, the optional comment and the buttons. Saving a new review or a change to one closes the
 * dialog when the backend accepts it; otherwise the errors stay on screen and the customer's input is kept.
 *
 * @param props Props of the component, see {@link ReviewFormModalProps}.
 * @param props.target What the form is open for: a new review of a visit, or a change to a review.
 * @param props.onSave Saves the review; resolves with the result of the Server Action.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
export function ReviewFormModal({ target, onSave, onClose }: ReviewFormModalProps) {
  const form = useReviewForm({ target, onSave, onDone: onClose });
  const creating = target.mode === "create";
  const description = creating ? `${visitTitle(target.visit)} at ${target.visit.branchName}` : EDIT_NOTE;

  return (
    <Modal
      open
      onClose={onClose}
      title={creating ? CREATE_TITLE : EDIT_TITLE}
      description={description}
      actions={
        <>
          <Button type="button" variant="tertiary" onClick={onClose}>
            {CANCEL_LABEL}
          </Button>
          <Button type="submit" form={FORM_ID} loading={form.submitting}>
            {form.submitting ? SAVING_LABEL : creating ? CREATE_SUBMIT : EDIT_SUBMIT}
          </Button>
        </>
      }
    >
      <form id={FORM_ID} noValidate onSubmit={form.handleSubmit} className={styles.form}>
        {form.submitError && (
          <Alert tone="error" title={SAVE_ERROR_TITLE}>
            {form.submitError}
          </Alert>
        )}
        <RatingInput value={form.values.rating} onChange={form.setRating} error={form.errors.rating} />
        <Textarea
          id={COMMENT_ID}
          label={COMMENT_LABEL}
          optional
          helper={COMMENT_HELPER}
          error={form.errors.comment}
          rows={5}
          maxLength={REVIEW_COMMENT_MAX}
          value={form.values.comment}
          onChange={(event) => form.setComment(event.target.value)}
        />
      </form>
    </Modal>
  );
}
