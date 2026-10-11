import type { StepContentProps } from "../BookingFlow.types";
import { StepConfirmed } from "./StepConfirmed";
import { StepDateTime } from "./StepDateTime";
import { StepReview } from "./StepReview";

/**
 * Steps from picking the day to the confirmation: date and time, review and confirmed.
 *
 * @param props Props of the component, see {@link StepContentProps}.
 * @param props.flow State of the booking.
 * @returns The rendered element.
 */
export function ScheduleStep({ flow }: StepContentProps) {
  const { step, selection, loading, setField, chooseDate, goTo, alternatives, pickAlternative, restart } = flow;
  if (step === "datetime") return <StepDateTime selection={selection} loading={loading} setField={setField} chooseDate={chooseDate} goTo={goTo} />;
  if (step === "review") return <StepReview selection={selection} setField={setField} alternatives={alternatives} pickAlternative={pickAlternative} />;
  return <StepConfirmed selection={selection} restart={restart} />;
}
