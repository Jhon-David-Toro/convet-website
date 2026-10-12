import type { ComponentType } from "react";

import type { LucideIcon } from "lucide-react";

import type { DialogControlProps } from "@/components/patterns/FormModal";
import { DeleteAccountModal } from "@/components/sections/DeleteAccountModal";
import { EmailModal } from "@/components/sections/EmailModal";
import { InviteModal } from "@/components/sections/InviteModal";
import { NewClientModal } from "@/components/sections/ClientModal/NewClientModal";
import { PasswordModal } from "@/components/sections/PasswordModal";
import { PatientModal } from "@/components/sections/PatientModal";
import { ProductModal } from "@/components/sections/ProductModal";
import { ServiceModal } from "@/components/sections/ServiceModal";
import { SupplierModal } from "@/components/sections/SupplierModal";
import { TimeOffModal } from "@/components/sections/TimeOffModal";

import { Calendar, Mail, Plus } from "@/components/ui/Icon";

import type { ModalIconKey, ModalKey } from "./ModalButton.types";

export const MODAL_COMPONENTS: Record<ModalKey, ComponentType<DialogControlProps>> = {
  "new-client": NewClientModal,
  supplier: SupplierModal,
  service: ServiceModal,
  product: ProductModal,
  password: PasswordModal,
  email: EmailModal,
  "delete-account": DeleteAccountModal,
  invite: InviteModal,
  "time-off": TimeOffModal,
  patient: PatientModal,
};

export const MODAL_ICONS: Record<ModalIconKey, LucideIcon> = { plus: Plus, mail: Mail, calendar: Calendar };
