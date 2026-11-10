import type { FlowContentProps } from "../BookingFlow.types";
import { petName, stepCopy } from "../BookingFlow.utils";
import { StepContent } from "./StepContent";
import { StepHeading } from "./StepHeading";

/**
 * Title of the step (not on the confirmation, which has its own) and its content.
 *
 * @param props Props of the component, see {@link FlowContentProps}.
 * @returns The rendered element.
 */
export function FlowContent({
  flow,
  pets,
  onAddPet,
}: FlowContentProps) {
  const copy = stepCopy(
    flow.step,
    petName(flow.selection.petId, pets),
  );

  return (
    <>
      {flow.step !== "confirmed" && (
        <StepHeading
          title={copy.title}
          subtitle={copy.subtitle}
        />
      )}
      <StepContent
        flow={flow}
        pets={pets}
        onAddPet={onAddPet}
      />
    </>
  );
}