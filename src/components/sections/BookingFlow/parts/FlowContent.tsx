import { StepContent } from "./StepContent";
import { StepHeading } from "./StepHeading";
import type { FlowContentProps } from "../BookingFlow.types";
import { petName, stepCopy } from "../BookingFlow.utils";

/**
 * Title of the step (not on the confirmation, which has its own) and its content.
 *
 * @param props Props of the component, see {@link FlowContentProps}.
 * @param props.flow State of the booking.
 * @returns The rendered element.
 */
export function FlowContent({ flow }: FlowContentProps) {
  const copy = stepCopy(flow.step, petName(flow.selection.petId));

  return (
    <>
      {flow.step !== "confirmed" && <StepHeading title={copy.title} subtitle={copy.subtitle} />}
      <StepContent flow={flow} />
    </>
  );
}
