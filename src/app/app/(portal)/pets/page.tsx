import type { Metadata } from "next";

import { MyPets } from "@/components/sections/MyPets";

import type { MyPetsPageProps } from "./page.types";

export const metadata: Metadata = {
  title: "My pets · CONVET",
};

/**
 * My pets page of the customer area; `?add=1` opens the "Add a pet" modal straight away.
 *
 * @param props Props of the page, see {@link MyPetsPageProps}.
 * @param props.searchParams Query string.
 * @returns The rendered element.
 */
export default async function MyPetsPage({ searchParams }: MyPetsPageProps) {
  const { add } = await searchParams;

  return <MyPets initialAddOpen={add === "1"} />;
}
