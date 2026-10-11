import { Textarea } from "@/components/ui/Textarea";

import { INTERNAL_NOTES_HELPER, INTERNAL_NOTES_LABEL, INTERNAL_NOTES_PLACEHOLDER, OWNER_SUMMARY_HELPER, OWNER_SUMMARY_LABEL } from "../VisitRecord.constants";
import type { VisitFieldsProps } from "../VisitRecord.types";

/**
 * Notes of the visit: the internal ones (only staff can read them) and the summary the owner will see.
 *
 * @param props Props of the component, see {@link VisitFieldsProps}.
 * @param props.bind Gives the value and change handler of a field.
 * @returns The rendered element.
 */
export function NotesFields({ bind }: VisitFieldsProps) {
  return (
    <>
      <Textarea label={INTERNAL_NOTES_LABEL} optional placeholder={INTERNAL_NOTES_PLACEHOLDER} helper={INTERNAL_NOTES_HELPER} {...bind("internalNotes")} />
      <Textarea label={OWNER_SUMMARY_LABEL} helper={OWNER_SUMMARY_HELPER} {...bind("ownerSummary")} />
    </>
  );
}
