import { CHOICE_STEPS } from "../BookingFlow.constants";
import type { StepContentProps } from "../BookingFlow.types";
import { ChoiceStep } from "./ChoiceStep";
import { ScheduleStep } from "./ScheduleStep";
import type { FlowContentProps } from "../BookingFlow.types";

/**
 * Content of the current step.
 *
 * @param props Props of the component, see {@link StepContentProps}.
 * @returns The rendered element.
 */
export function StepContent({
  flow,
  pets,
  onAddPet,
}: FlowContentProps) {
  return CHOICE_STEPS.includes(flow.step) ? (
    <ChoiceStep
      flow={flow}
      pets={pets}
      onAddPet={onAddPet}
    />
  ) : (
    <ScheduleStep flow={flow} pets={pets} />
  );
}