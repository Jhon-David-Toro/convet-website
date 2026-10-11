import { CHOICE_STEPS } from "../BookingFlow.constants";
import type { StepContentProps } from "../BookingFlow.types";
import { ChoiceStep } from "./ChoiceStep";
import { ScheduleStep } from "./ScheduleStep";

/**
 * Content of the current step.
 *
 * @param props Props of the component, see {@link StepContentProps}.
 * @param props.flow State of the booking.
 * @returns The rendered element.
 */
export function StepContent({ flow }: StepContentProps) {
  return CHOICE_STEPS.includes(flow.step) ? <ChoiceStep flow={flow} /> : <ScheduleStep flow={flow} />;
}
