import { INTERNAL_NOTES_TITLE, SHARED_SUMMARY_TITLE } from "../PatientRecord.constants";
import type { VisitNotesProps } from "../PatientRecord.types";
import { NoteBox } from "./NoteBox";

/**
 * The two notes of a visit: the internal one and the summary shared with the owner.
 *
 * @param props Props of the component, see {@link VisitNotesProps}.
 * @param props.visit Visit to show.
 * @returns The rendered element.
 */
export function VisitNotes({ visit }: VisitNotesProps) {
  return (
    <>
      <NoteBox tone="internal" title={INTERNAL_NOTES_TITLE} text={visit.internalNotes} />
      <NoteBox tone="shared" title={SHARED_SUMMARY_TITLE} text={visit.sharedSummary} />
    </>
  );
}
