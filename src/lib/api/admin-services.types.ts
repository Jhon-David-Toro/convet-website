import type { SelectOption } from "@/components/ui/Select";
import type { ServiceRow } from "@/lib/admin/admin.types";

export type AdminServicesData = {
  branchName?: string;
  rows: ServiceRow[];
  categories: SelectOption[];
  vetNames: string[];
};
