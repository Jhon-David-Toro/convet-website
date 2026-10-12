import { useEffect, useState } from "react";

import { observeSections } from "../LegalPage.utils";

/**
 * Id of the section of the page that is being read.
 *
 * @param ids Ids of the sections of the page; the first one is active until the reader scrolls.
 * @returns The id of the active section.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => observeSections(ids, setActive), [ids]);

  return active;
}
