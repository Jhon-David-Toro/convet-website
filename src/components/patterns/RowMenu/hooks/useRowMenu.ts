import { useEffect, useRef } from "react";

import { useDisclosure } from "@/lib/shared/useDisclosure";
import { useOutsidePointerDown } from "@/lib/shared/useOutsidePointerDown";

import { listenEscape } from "../RowMenu.utils";

/**
 * State of a row menu: open or closed, closing on Escape and on a press outside of it.
 *
 * @returns The ref of the root element, whether the menu is open and the functions that toggle and close it.
 */
export function useRowMenu() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { open, show, hide } = useDisclosure();

  useOutsidePointerDown(rootRef, open, hide);
  useEffect(() => (open ? listenEscape(hide) : undefined), [open, hide]);

  return { rootRef, open, toggle: open ? hide : show, close: hide };
}
