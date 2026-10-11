import { ADMIN_CLIENTS } from "@/lib/admin/admin.constants";
import type { AdminClient } from "@/lib/admin/admin.types";

import { ALL_FILTER } from "./AdminClients.constants";

/**
 * Clients that match the selected chip and what was typed in the search (name, pets or phone).
 *
 * @param filter Value of the selected chip: "all", "linked" or "walk-in".
 * @param query Text typed by the user.
 * @returns The clients to list.
 */
export function clientsFor(filter: string, query: string): AdminClient[] {
  const text = query.trim().toLowerCase();
  return ADMIN_CLIENTS.filter((client) => {
    const kind = filter === ALL_FILTER || client.account === filter;
    return kind && (!text || `${client.name} ${client.pets} ${client.phone}`.toLowerCase().includes(text));
  });
}
