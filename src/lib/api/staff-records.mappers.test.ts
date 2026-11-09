import { describe, expect, it } from "vitest";

import { medicalRecordDetailSchema, medicalRecordSchema } from "./medical-records.contract";
import { nonBlankTexts } from "./medical-records.mappers";
import { petSchema } from "./pets.contract";
import { toMedicalRecordUpdate, toStaffPatient, toStaffTimeline, toVisitForm, toVisitSummary } from "./staff-records.mappers";

const RECORD = {
  idMedicalRecord: "r1",
  petId: "p1",
  observations: "Limping",
  diagnosis: "Strain",
  treatment: "Carprofen 5 days",
  recommendations: "Rest a week",
  createdAt: "2026-09-11T14:30:00.000Z",
  veterinarian: { user: { firstName: "Shirley", lastName: "Croes" } },
  appointment: { startsAt: "2026-09-11T14:30:00.000Z", completedAt: null, branch: { name: "Oranjestad" }, branchService: { service: { name: "Consultation" } } },
};

describe("staff record mappers", () => {
  it("builds the patient header from the pet", () => {
    const pet = petSchema.parse({ idPet: "p1", ownerId: "u1", name: "Luna", species: "CAT", sex: "FEMALE" });
    expect(toStaffPatient(pet)).toMatchObject({ id: "p1", name: "Luna", species: "cat", ownerId: "u1", microchip: "—" });
  });

  it("builds the last visit card and the history", () => {
    const records = [medicalRecordSchema.parse(RECORD), medicalRecordSchema.parse({ ...RECORD, idMedicalRecord: "r0", treatment: null })];
    expect(toVisitSummary(records[0])).toMatchObject({ title: "Consultation", meta: "Sep 11, 2026 · Dr. Croes · Oranjestad", findings: "Limping", plan: "Carprofen 5 days" });
    expect(toStaffTimeline(records).map((entry) => entry.id)).toEqual(["r1-treatment", "r0-visit"]);
  });

  it("maps the visit form both ways and leaves blank texts out", () => {
    const visit = toVisitForm(medicalRecordDetailSchema.parse({ ...RECORD, appointmentId: "a1", veterinarianId: "v1", pet: { idPet: "p1", name: "Luna" } }));
    expect(visit).toMatchObject({ id: "r1", patientId: "p1", findings: "Limping", ownerSummary: "Rest a week" });
    expect(nonBlankTexts(toMedicalRecordUpdate({ findings: " Better ", diagnosis: "  ", plan: "", ownerSummary: "Ok" }))).toEqual({ observations: "Better", recommendations: "Ok" });
  });
});
