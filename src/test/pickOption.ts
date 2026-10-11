import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Opens a select by its accessible name and picks one of its options, as a user would.
 *
 * @param name Accessible name (the label) of the select.
 * @param option Text of the option to pick.
 * @param index Which select to use when several share the name; the first by default.
 */
export async function pickOption(name: string | RegExp, option: string, index = 0): Promise<void> {
  await userEvent.click(screen.getAllByRole("combobox", { name })[index]);
  await userEvent.click(within(screen.getByRole("listbox")).getByRole("option", { name: option }));
}
