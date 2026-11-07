import { describe, expect, it } from "vitest";

import { medicalRecordPageSchema } from "./medical-records.contract";
import { toPetEvents } from "./medical-records.mappers";

const RECORD = {
  idMedicalRecord: "r1",
  petId: "p1",
  observations: "Mild strain.",
  diagnosis: "Right front leg sprain.",
  treatment: "Carprofen 50 mg for 5 days.",
  recommendations: "Rest for a week.",
  createdAt: "2026-09-11T15:00:00.000Z",
  veterinarian: { user: { firstName: "Shirley", lastName: "Croes" } },
  appointment: { startsAt: "2026-09-11T14:00:00.000Z", branch: { name: "Main clinic" }, branchService: { service: { name: "Consultation" } } },
};

describe("toPetEvents", () => {
  it("turns a record into a visit and its treatment", () => {
    const [visit, treatment] = toPetEvents(medicalRecordPageSchema.shape.data.element.parse(RECORD));
    expect(visit).toEqual({ id: "r1", petId: "p1", type: "visit", title: "Consultation", meta: "Sep 11, 2026 · Dr. Shirley Croes", summary: "Right front leg sprain. Mild strain. Rest for a week.", year: "2026" });
    expect(treatment).toMatchObject({ id: "r1-treatment", type: "treatment", summary: "Carprofen 50 mg for 5 days.", year: "2026" });
  });

  it("copes with a record that has only some fields", () => {
    const events = toPetEvents(medicalRecordPageSchema.shape.data.element.parse({ idMedicalRecord: "r2", petId: "p1", diagnosis: null, createdAt: "2025-01-02T12:00:00.000Z" }));
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ title: "Visit", meta: "Jan 2, 2025", summary: "", year: "2025" });
  });

  it("uses the clinic's time zone for the year", () => {
    const [event] = toPetEvents(medicalRecordPageSchema.shape.data.element.parse({ idMedicalRecord: "r3", petId: "p1", createdAt: "2026-01-01T02:00:00.000Z" }));
    expect(event.year).toBe("2025");
  });
});
