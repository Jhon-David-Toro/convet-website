import { Alert } from "@/components/ui/Alert";

import { SERVICE_SUBTITLE_NOTE, TIP_TEXT, TIP_TITLE } from "../BookingFlow.constants";
import { serviceOptions } from "../BookingFlow.utils";
import type { StepServiceProps } from "../BookingFlow.types";
import { OptionList } from "./OptionList";

/**
 * Step 2: which service the pet needs, with a tip to add every due vaccine to the same visit.
 *
 * @param props Props of the component, see {@link StepServiceProps}.
 * @param props.selection What is selected so far.
 * @param props.setField Changes one value of the selection.
 * @param props.pet Chosen pet.
 * @returns The rendered element.
 */
export function StepService({ selection, setField, pet }: StepServiceProps) {
  return (
    <>
      <OptionList name="service" label={SERVICE_SUBTITLE_NOTE} options={serviceOptions(pet.id)} value={selection.serviceId} onChange={(id) => setField("serviceId", id)} />
      {pet.vaccineStatus !== "up-to-date" && (
        <Alert tone="info" title={TIP_TITLE}>
          {TIP_TEXT}
        </Alert>
      )}
    </>
  );
}
