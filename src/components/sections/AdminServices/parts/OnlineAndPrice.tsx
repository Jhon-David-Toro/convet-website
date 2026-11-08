import { TextInput } from "@/components/ui/TextInput";
import { Toggle } from "@/components/ui/Toggle";

import { BOOKABLE_DESCRIPTION, BOOKABLE_LABEL, PRICE_HELPER, PRICE_LABEL } from "../AdminServices.constants";
import type { DraftFieldsProps } from "../AdminServices.types";

/**
 * Whether the service can be booked online, and the price shown on the website.
 *
 * @param props Props of the component, see {@link DraftFieldsProps}.
 * @param props.draft Values being edited.
 * @param props.setField Changes one value.
 * @param props.priceError Message shown under the price when it is not valid.
 * @returns The rendered element.
 */
export function OnlineAndPrice({ draft, setField, priceError }: DraftFieldsProps) {
  return (
    <>
      <Toggle label={BOOKABLE_LABEL} description={BOOKABLE_DESCRIPTION} checked={draft.online} onChange={(event) => setField("online", event.target.checked)} />
      <TextInput label={PRICE_LABEL} optional helper={PRICE_HELPER} error={priceError} value={draft.price} onChange={(event) => setField("price", event.target.value)} />
    </>
  );
}
