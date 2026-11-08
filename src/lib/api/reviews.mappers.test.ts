import { describe, expect, it } from "vitest";

import type { CompletedVisitRecordsDto, MyReviewDto } from "./reviews.contract";
import { completedVisitsOf, visitsToReview } from "./reviews.mappers";

const visitRecord = (appointmentId: string, completedAt: string) => ({
  appointment: {
    idAppointment: appointmentId,
    startsAt: completedAt,
    completedAt,
    branch: { name: "Oranjestad" },
    branchService: { service: { name: "Vaccination" } },
  },
});

const reviewOf = (appointmentId: string): MyReviewDto => ({
  idReview: `review-${appointmentId}`,
  rating: 5,
  comment: undefined,
  status: "APPROVED",
  createdAt: "2026-11-01T10:00:00.000Z",
  appointment: {
    idAppointment: appointmentId,
    startsAt: "2026-10-30T14:00:00.000Z",
    completedAt: "2026-10-30T14:40:00.000Z",
    pet: { idPet: "pet-1", name: "Luna", species: "DOG" },
    branch: { idBranch: "branch-1", name: "Oranjestad", city: "Oranjestad" },
    branchService: { service: { idService: "service-1", name: "Vaccination" } },
  },
});

describe("completedVisitsOf", () => {
  it("turns the records of a pet into visits and skips records without an appointment", () => {
    const page: CompletedVisitRecordsDto = {
      data: [visitRecord("a-1", "2026-10-30T14:40:00.000Z"), { appointment: null }],
    };

    expect(completedVisitsOf("Luna", page)).toEqual([
      {
        appointmentId: "a-1",
        petName: "Luna",
        serviceName: "Vaccination",
        branchName: "Oranjestad",
        startsAt: "2026-10-30T14:40:00.000Z",
        completedAt: "2026-10-30T14:40:00.000Z",
      },
    ]);
  });
});

describe("visitsToReview", () => {
  it("leaves out the visits that already have a review", () => {
    const visits = completedVisitsOf("Luna", {
      data: [visitRecord("a-1", "2026-10-30T14:40:00.000Z"), visitRecord("a-2", "2026-10-20T14:40:00.000Z")],
    });

    expect(visitsToReview(visits, [reviewOf("a-1")]).map((visit) => visit.appointmentId)).toEqual(["a-2"]);
  });

  it("lists each visit once, the most recent first", () => {
    const older = completedVisitsOf("Luna", { data: [visitRecord("a-2", "2026-10-20T14:40:00.000Z")] });
    const newer = completedVisitsOf("Milo", { data: [visitRecord("a-1", "2026-10-30T14:40:00.000Z")] });

    expect(visitsToReview([...older, ...newer, ...older], []).map((visit) => visit.appointmentId)).toEqual(["a-1", "a-2"]);
  });
});
