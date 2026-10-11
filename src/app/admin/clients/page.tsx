import type { Metadata } from "next";

import { AdminClients } from "@/components/sections/AdminClients";

export const metadata: Metadata = {
  title: "Clients & pets · CONVET admin",
};

/**
 * Clients and pets page of the admin area.
 *
 * @returns The rendered element.
 */
export default function AdminClientsPage() {
  return <AdminClients />;
}
