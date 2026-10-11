import { AppTopBar } from "@/components/ui/AppTopBar";

import type { CustomerPathProps } from "../CustomerShell.types";
import { TopBarEnd } from "./TopBarEnd";
import { TopBarStart } from "./TopBarStart";

/**
 * Top bar of the customer area. Desktop: the greeting, the notifications bell and the booking button.
 * Below desktop: a back arrow or the circular logo, the page title and the bell.
 *
 * @param props Props of the component, see {@link CustomerPathProps}.
 * @param props.pathname Path of the current page.
 * @returns The rendered element.
 */
export function CustomerTopBar({ pathname }: CustomerPathProps) {
  return <AppTopBar start={<TopBarStart pathname={pathname} />} end={<TopBarEnd />} />;
}
