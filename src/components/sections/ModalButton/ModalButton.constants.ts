import type { ComponentType } from "react";

import type { DialogControlProps } from "@/components/patterns/FormModal";
import { DeleteAccountModal } from "@/components/sections/DeleteAccountModal";
import { EmailModal } from "@/components/sections/EmailModal";
import { NewClientModal } from "@/components/sections/ClientModal/NewClientModal";
import { PasswordModal } from "@/components/sections/PasswordModal";
import { ProductModal } from "@/components/sections/ProductModal";
import { ServiceModal } from "@/components/sections/ServiceModal";
import { SupplierModal } from "@/components/sections/SupplierModal";

import type { ModalKey } from "./ModalButton.types";

export const MODAL_COMPONENTS: Record<ModalKey, ComponentType<DialogControlProps>> = {
  "new-client": NewClientModal,
  supplier: SupplierModal,
  service: ServiceModal,
  product: ProductModal,
  password: PasswordModal,
  email: EmailModal,
  "delete-account": DeleteAccountModal,
};
