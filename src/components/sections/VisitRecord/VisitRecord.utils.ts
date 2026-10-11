import type { SubmitEvent } from "react";

import type { StaffLot, StaffPatient, StaffVisitForm } from "@/lib/staff.types";

import { EXPIRED_LOT_NOTE, MICROCHIP_LABEL, NEXT_VISIT_LABEL, WEIGHT_FACT_LABEL } from "./VisitRecord.constants";
import type { PatientFact, VisitValues } from "./VisitRecord.types";

/**
 * Values the visit form starts with.
 *
 * @param visit Visit of the record.
 * @returns The initial value of every field.
 */
export function initialValues(visit: StaffVisitForm): VisitValues {
  return {
    reason: visit.reason,
    weight: visit.weight,
    temperature: visit.temperature,
    heartRate: visit.heartRate,
    findings: visit.findings,
    diagnosis: visit.diagnosis,
    plan: visit.plan,
    vaccine: visit.vaccine,
    nextDose: visit.nextDose,
    internalNotes: visit.internalNotes,
    ownerSummary: visit.ownerSummary,
  };
}

/**
 * Line that identifies the lot suggested for the vaccine: code and expiry date.
 *
 * @param lot Lot of the vaccine.
 * @returns For example "LP-25102 · exp Jan 31, 2027".
 */
export function lotLine(lot: StaffLot): string {
  return `${lot.code} · exp ${lot.expires}`;
}

/**
 * Line under the lot: how many doses are left.
 *
 * @param lot Lot of the vaccine.
 * @param note Reason the lot was suggested.
 * @returns For example "9 doses left · Suggested: expires first (FEFO)".
 */
export function lotDetail(lot: StaffLot, note: string): string {
  return `${lot.dosesLeft} doses left · ${note}`;
}

/**
 * Message that explains why an expired lot cannot be picked.
 *
 * @param lot Code of the expired lot.
 * @returns The sentence with the code of the lot.
 */
export function expiredLotMessage(lot: string): string {
  return EXPIRED_LOT_NOTE.replace("{lot}", lot);
}

/**
 * Stops the browser from sending the form: the visit is saved or signed with the footer buttons.
 *
 * @param event Submit event of the form.
 */
export function preventSubmit(event: SubmitEvent<HTMLFormElement>): void {
  event.preventDefault();
}

/**
 * Facts shown under the patient: microchip, weight and next visit.
 *
 * @param patient Patient of the visit.
 * @returns The label and value of each fact, and whether the value is a code.
 */
export function patientFacts(patient: StaffPatient): PatientFact[] {
  return [
    { label: MICROCHIP_LABEL, value: patient.microchip, mono: true },
    { label: WEIGHT_FACT_LABEL, value: patient.currentWeight },
    { label: NEXT_VISIT_LABEL, value: patient.nextVisit },
  ];
}

/**
 * Title of the page for a patient.
 *
 * @param prefix Start of the title.
 * @param patient Name of the patient.
 * @returns For example "New visit · Luna".
 */
export function visitTitle(prefix: string, patient: string): string {
  return `${prefix} · ${patient}`;
}
