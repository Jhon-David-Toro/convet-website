import { useEffect, useRef } from "react";

import { listenSearchShortcut } from "../ProductCatalog.utils";

/**
 * Creates the ref of the search field and focuses it with Ctrl/Command + K.
 *
 * @returns The ref to pass to the search field.
 */
export function useSearchShortcut() {
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => listenSearchShortcut(searchRef), []);
  return searchRef;
}
