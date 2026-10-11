import type { Metadata } from "next";

import { StaffToday } from "@/components/sections/StaffToday";

export const metadata: Metadata = {
  title: "Today · CONVET staff",
};

/**
 * Today page of the staff area.
 *
 * @returns The rendered element.
 */
export default function StaffTodayPage() {
  return <StaffToday />;
}
