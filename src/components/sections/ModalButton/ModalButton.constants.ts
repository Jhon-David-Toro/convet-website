import type { ComponentType } from "react";

import type { DialogControlProps } from "@/components/patterns/FormModal";
import { NewClientModal } from "@/components/sections/ClientModal/NewClientModal";
import { ProductModal } from "@/components/sections/ProductModal";
import { ServiceModal } from "@/components/sections/ServiceModal";
import { SupplierModal } from "@/components/sections/SupplierModal";

import type { ModalKey } from "./ModalButton.types";

export const MODAL_COMPONENTS: Record<ModalKey, ComponentType<DialogControlProps>> = {
  "new-client": NewClientModal,
  supplier: SupplierModal,
  service: ServiceModal,
  product: ProductModal,
};
