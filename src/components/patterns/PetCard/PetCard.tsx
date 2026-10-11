import { ROW_LAYOUT } from "./PetCard.constants";
import type { PetCardProps } from "./PetCard.types";
import { PetCardFull } from "./parts/PetCardFull";
import { PetCardRow } from "./parts/PetCardRow";

/**
 * Card/Pet: a pet's profile. `card` is the full card; `row` is the compact row of a list.
 *
 * @param props Props of the component, see {@link PetCardProps}.
 * @param props.layout Layout of the card: `"card"` or `"row"`.
 * @param props.props Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function PetCard({ layout = "card", ...props }: PetCardProps) {
  return layout === ROW_LAYOUT ? <PetCardRow {...props} /> : <PetCardFull {...props} />;
}
