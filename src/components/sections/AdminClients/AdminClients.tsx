"use client";

import { useState } from "react";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Pagination } from "@/components/ui/Pagination";

import { FILTER_OPTIONS, FILTERS_LABEL, PAGE_COUNT, PAGE_SIZE, SUBTITLE, TITLE, TOTAL } from "./AdminClients.constants";
import { clientsFor } from "./AdminClients.utils";
import { ClientFilters } from "./parts/ClientFilters";
import { ClientsActions } from "./parts/ClientsActions";
import { ClientsTable } from "./parts/ClientsTable";

/**
 * Clients and pets page of the admin area: search, chips by kind of account, the table of clients with their pets and the pagination.
 *
 * @returns The rendered element.
 */
export function AdminClients() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  return (
    <PageStack>
      <PageHeader title={TITLE} subtitle={SUBTITLE} actions={<ClientsActions />} />
      <ClientFilters query={query} onQuery={setQuery} label={FILTERS_LABEL} options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
      <ClientsTable rows={clientsFor(filter, query)} />
      <Pagination page={page} pageCount={PAGE_COUNT} total={TOTAL} pageSize={PAGE_SIZE} onPageChange={setPage} />
    </PageStack>
  );
}
