import type { StatCardProps } from "@/components/ui/StatCard";

export type AdminStat = Pick<StatCardProps, "label" | "value" | "caption" | "icon" | "tone">;

export type StockStatus = "lot-expires" | "in-stock" | "out-of-stock" | "low-stock" | "expired-blocked" | "expires-soon" | "available" | "use-first";

export type StockType = "Medication" | "Supplement" | "Veterinary product";

export type StockProduct = {
  id: string;
  name: string;
  sku: string;
  type: StockType;
  onHand: number;
  minimum: number;
  nextExpiry: string;
  status: StockStatus;
};

export type InventoryAlert = {
  id: string;
  product: string;
  lot: string;
  stock: number;
  status: StockStatus;
};

export type VetDay = {
  id: string;
  name: string;
  photo: string;
  summary: string;
};

export type ProductLot = {
  code: string;
  expiry: string;
  supplier: string;
  received: string;
  onHand: number;
  status: StockStatus;
};

export type StockMovementType = "clinical-use" | "receipt" | "adjustment";

export type StockMovement = {
  id: string;
  when: string;
  type: StockMovementType;
  detail: string;
  quantity: number;
};

export type ProductDetail = {
  id: string;
  category: string;
  name: string;
  overline: string;
  description: string;
  usable: { value: number; caption: string };
  nextExpiry: { value: string; caption: string };
  blocked: { value: number; caption: string };
  lots: ProductLot[];
  movements: StockMovement[];
};

export type CatalogProduct = {
  id: string;
  family: string;
  name: string;
  description: string;
  sku: string;
  uuid: string;
  stock: number;
  low: boolean;
  unit: string;
};

export type ReceiptLine = {
  id: string;
  productId: string;
  lot: string;
  expiry: string;
  quantity: string;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  lastDelivery: string;
};

export type TeamRole = "veterinarian" | "administrator" | "assistant";

export type TeamStatus = "active" | "invited";

export type TeamMember = {
  id: string;
  name: string;
  userId: string;
  staffId: string;
  role: TeamRole;
  clinicalNo: string;
  clinicalLabel: string;
  location: string;
  twoStep: "on" | "not-set-up" | "none";
  status: TeamStatus;
};

export type WorkingDay = {
  day: string;
  shifts: string[];
};

export type ServiceRow = {
  id: string;
  name: string;
  duration: number;
  online: boolean;
  vets: number;
  buffer: number;
  species: string[];
  price: string;
};

export type CatalogRow = {
  id: string;
  name: string;
  detail: string;
  sku: string;
  uuid: string;
  category: string;
  type: StockType;
  prescription: "rx" | "otc";
  published: boolean;
};

export type AdminAppointmentStatus = "in-progress" | "booked-online" | "scheduled" | "completed" | "cancelled" | "no-show";

export type AdminAppointment = {
  id: string;
  date: string;
  time: string;
  patient: string;
  species: "dog" | "cat";
  owner: string;
  service: string;
  vet: string;
  source: string;
  status: AdminAppointmentStatus;
};

export type AccountKind = "linked" | "walk-in" | "invite-pending";

export type AdminClient = {
  id: string;
  name: string;
  pets: string;
  phone: string;
  account: AccountKind;
  lastVisit: string;
};

export type ClosureEntry = {
  id: string;
  date: string;
  note: string;
};

export type OpeningHours = {
  label: string;
  hours: string;
};

export type LocationInfo = {
  name: string;
  subtitle: string;
  phone: string;
  whatsapp: string;
  hours: OpeningHours[];
  closures: ClosureEntry[];
};

export type BookingRules = {
  notice: string;
  horizon: string;
  rescheduleWindow: string;
  maxUpcoming: string;
  slotInterval: string;
  maxPerSlot: string;
  autoConfirm: boolean;
  chooseVet: boolean;
};
