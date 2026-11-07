import { AppTopBar } from "@/components/ui/AppTopBar";

import type { CustomerTopBarProps } from "../CustomerShell.types";
import { TopBarEnd } from "./TopBarEnd";
import { TopBarStart } from "./TopBarStart";

/**
 * Top bar of the customer area. Desktop: the greeting, the notifications bell and the booking button.
 * Below desktop: a back arrow or the circular logo, the page title and the bell.
 *
 * @param props Props of the component, see {@link CustomerTopBarProps}.
 * @param props.pathname Path of the current page.
 * @param props.firstName First name of the signed-in customer.
 * @returns The rendered element.
 */
export function CustomerTopBar({ pathname, firstName }: CustomerTopBarProps) {
  return <AppTopBar start={<TopBarStart pathname={pathname} firstName={firstName} />} end={<TopBarEnd />} />;
}
