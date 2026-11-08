import type { CompletedVisit } from "@/lib/reviews/reviews.types";

import type { CompletedVisitRecordsDto, MyReviewDto } from "./reviews.contract";

/**
 * Completed visits of one pet, from its medical records. Records without an appointment are skipped.
 *
 * @param petName Name of the pet, shown with each visit.
 * @param page Medical records of the pet.
 * @returns The visits, in the order the backend sends them.
 */
export function completedVisitsOf(petName: string, page: CompletedVisitRecordsDto): CompletedVisit[] {
  return page.data.flatMap(({ appointment }) =>
    appointment
      ? [
          {
            appointmentId: appointment.idAppointment,
            petName,
            serviceName: appointment.branchService.service.name,
            branchName: appointment.branch.name,
            startsAt: appointment.startsAt,
            completedAt: appointment.completedAt,
          },
        ]
      : [],
  );
}

/**
 * Time a visit is sorted by: when it was completed, or when it started.
 *
 * @param visit Completed visit.
 * @returns Milliseconds since the epoch; 0 when the date is not valid.
 */
function visitTime(visit: CompletedVisit): number {
  return Date.parse(visit.completedAt ?? visit.startsAt) || 0;
}

/**
 * Visits the customer can still review: the ones without a review, each one once, the most recent first.
 *
 * @param visits Completed visits of every pet.
 * @param reviews Reviews the customer has written; a review says which appointment it is about.
 * @returns The visits without a review.
 */
export function visitsToReview(visits: CompletedVisit[], reviews: MyReviewDto[]): CompletedVisit[] {
  const reviewed = new Set(reviews.map((review) => review.appointment.idAppointment));
  const unique = new Map<string, CompletedVisit>();
  for (const visit of visits) {
    if (!reviewed.has(visit.appointmentId) && !unique.has(visit.appointmentId)) unique.set(visit.appointmentId, visit);
  }
  return [...unique.values()].sort((first, second) => visitTime(second) - visitTime(first));
}
