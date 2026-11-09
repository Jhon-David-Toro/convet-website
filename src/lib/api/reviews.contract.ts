import { z } from "zod";

import { optionalText, pageMetaSchema } from "./api.contract";

export const REVIEW_STATUSES = ["PENDING", "APPROVED", "HIDDEN"] as const;

const reviewAppointmentSchema = z.object({
  idAppointment: z.string(),
  startsAt: z.string(),
  completedAt: optionalText,
  pet: z.object({ idPet: z.string(), name: z.string(), species: z.string() }),
  branch: z.object({ idBranch: z.string(), name: z.string(), city: z.string() }),
  branchService: z.object({ service: z.object({ idService: z.string(), name: z.string() }) }),
});

/** Review as `POST /reviews`, `PATCH /reviews/:id` and the moderation endpoint send it (no relations). */
export const reviewSchema = z.object({
  idReview: z.string(),
  appointmentId: z.string(),
  rating: z.number().int(),
  comment: optionalText,
  status: z.enum(REVIEW_STATUSES),
  createdAt: z.string(),
});

/** Review of the signed-in customer, as `GET /reviews/mine` and `GET /reviews/:id` send it. */
export const myReviewSchema = reviewSchema.omit({ appointmentId: true }).extend({ appointment: reviewAppointmentSchema });

/** Review shown on the public website (`GET /reviews/public`, approved only). */
export const publicReviewSchema = z.object({
  idReview: z.string(),
  rating: z.number().int(),
  comment: optionalText,
  createdAt: z.string(),
  appointment: z.object({
    pet: z.object({ name: z.string(), species: z.string() }),
    branch: z.object({ name: z.string(), city: z.string() }),
    branchService: z.object({ service: z.object({ name: z.string() }) }),
    customer: z.object({ firstName: z.string() }),
  }),
});

/** Review in the admin moderation list (`GET /reviews`). */
export const adminReviewSchema = myReviewSchema.extend({
  appointment: reviewAppointmentSchema.extend({
    customer: z.object({ idUser: z.string(), firstName: z.string(), lastName: z.string(), email: z.string() }),
  }),
});

/**
 * One page of reviews: `{ data, meta }`.
 *
 * @param item Schema of one review.
 * @returns The schema of the page.
 */
export function reviewPageSchema<Item extends z.ZodType>(item: Item) {
  return z.object({ data: z.array(item), meta: pageMetaSchema });
}

export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export type ReviewDto = z.infer<typeof reviewSchema>;

export type MyReviewDto = z.infer<typeof myReviewSchema>;

export type PublicReviewDto = z.infer<typeof publicReviewSchema>;

export type AdminReviewDto = z.infer<typeof adminReviewSchema>;

/** Query of every review list: `page` from 1, `limit` 1 to 100; `status` is only applied by the admin list. */
export type ReviewQuery = { page?: number; limit?: number; status?: ReviewStatus };

/** Body of `POST /reviews`: only completed appointments of the customer can be reviewed, once. */
export type CreateReviewDto = { appointmentId: string; rating: number; comment?: string };

/** Body of `PATCH /reviews/:id`. Any change sends the review back to moderation. */
export type UpdateReviewDto = { rating?: number; comment?: string };

export const PUBLIC_REVIEWS_REVALIDATE_SECONDS = 600;

export const PUBLIC_REVIEWS_TAG = "reviews:public";

/**
 * Medical records of one pet as `GET /medical-records/pet/:petId` sends them, reduced to the appointment. A record exists only once
 * its visit is completed, so each record with an appointment is a visit the customer can review.
 */
export const completedVisitRecordsSchema = z.object({
  data: z.array(
    z.object({
      appointment: z
        .object({
          idAppointment: z.string(),
          startsAt: z.string(),
          completedAt: optionalText,
          branch: z.object({ name: z.string() }),
          branchService: z.object({ service: z.object({ name: z.string() }) }),
        })
        .nullish(),
    }),
  ),
});

export type CompletedVisitRecordsDto = z.infer<typeof completedVisitRecordsSchema>;

export const REVIEW_ENDPOINTS = {
  create: "/reviews",
  mine: "/reviews/mine",
  public: "/reviews/public",
  list: "/reviews",
  detail: (idReview: string) => `/reviews/${encodeURIComponent(idReview)}`,
  moderation: (idReview: string) => `/reviews/${encodeURIComponent(idReview)}/moderation`,
  petRecords: (idPet: string) => `/medical-records/pet/${encodeURIComponent(idPet)}`,
} as const;
