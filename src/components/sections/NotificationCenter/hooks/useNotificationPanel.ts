import { useEffect, useRef, useState } from "react";

import { FILTER_ALL } from "@/lib/notifications/notifications.utils";
import { listenEscape } from "@/lib/shared/escape";
import { useDisclosure } from "@/lib/shared/useDisclosure";
import { useOutsidePointerDown } from "@/lib/shared/useOutsidePointerDown";

/**
 * State of the notifications panel: open or closed, closing on Escape and on a press outside, and the tab that is selected.
 *
 * @returns The ref of the root element, whether the panel is open, the selected tab and the functions that change them.
 */
export function useNotificationPanel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { open, show, hide } = useDisclosure();
  const [filter, setFilter] = useState(FILTER_ALL);

  useOutsidePointerDown(rootRef, open, hide);
  useEffect(() => (open ? listenEscape(hide) : undefined), [open, hide]);

  return { rootRef, open, toggle: open ? hide : show, close: hide, filter, setFilter };
}
