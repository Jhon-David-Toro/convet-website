import type { ReactNode } from "react";

/** Props of the text block shared by Checkbox, Radio and Toggle. */
export type ChoiceTextProps = {
  /** Visible text. For icons it becomes the accessible name. */
  label: ReactNode;
  /** Description text under the title. */
  description?: ReactNode;
  /** Id of the description element, referenced by the input through `aria-describedby`. */
  descriptionId: string;
};
