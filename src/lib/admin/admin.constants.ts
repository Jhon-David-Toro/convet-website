import { AlertTriangle, Box, Calendar } from "@/components/ui/Icon";

import type {
  AdminAppointment,
  AdminStat,
  AdminClient,
  BookingRules,
  CatalogProduct,
  CatalogRow,
  InventoryAlert,
  LocationInfo,
  ProductDetail,
  ReceiptLine,
  ServiceRow,
  StockProduct,
  Supplier,
  TeamMember,
  VetDay,
  WorkingDay,
} from "./admin.types";

export const ADMIN_GREETING = "Good morning, Maria";

export const ADMIN_SUBTITLE = "Main clinic · Friday, October 9";

export const DASHBOARD_STATS: AdminStat[] = [
  { label: "Appointments today", value: 14, caption: "3 booked online", icon: Calendar, tone: "default" },
  { label: "New clients this week", value: 6, caption: "4 signed up online", icon: Calendar, tone: "default" },
  { label: "Low stock", value: 2, caption: "products below minimum", icon: Box, tone: "warning" },
  { label: "Expired lots", value: 1, caption: "2 doses blocked", icon: AlertTriangle, tone: "critical" },
];

export const INVENTORY_ALERTS: InventoryAlert[] = [
  { id: "rab-expired", product: "Rabies vaccine, inactivated", lot: "RB-23990", stock: 2, status: "expired-blocked" },
  { id: "joint", product: "Joint support chews", lot: "–", stock: 3, status: "low-stock" },
  { id: "rab-soon", product: "Rabies vaccine, inactivated", lot: "RB-24187", stock: 6, status: "expires-soon" },
  { id: "carprofen", product: "Carprofen 50 mg", lot: "CP-7741", stock: 0, status: "out-of-stock" },
];

export const VET_DAYS: VetDay[] = [
  { id: "shirley", name: "Dr. Shirley", photo: "dr-shirley", summary: "5 appointments · 2 done · 1 in progress" },
  { id: "larry", name: "Dr. Larry", photo: "dr-larry", summary: "5 appointments · 1 done · 1 arrived" },
  { id: "andreina", name: "Dr. Andreina", photo: "dr-andreina", summary: "4 appointments · 1 done · 1 in progress" },
];

export const ADMIN_CLIENTS: AdminClient[] = [
  { id: "anna", name: "Anna Lee", pets: "Luna (dog), Milo (cat)", phone: "+297 560 1234", account: "linked", lastVisit: "Oct 1, 2026" },
  { id: "rosa", name: "Rosa Arends", pets: "Nala (cat)", phone: "+297 593 8812", account: "linked", lastVisit: "Oct 1, 2026" },
  { id: "carlos", name: "Carlos Ras", pets: "Max (dog)", phone: "+297 641 2290", account: "walk-in", lastVisit: "Sep 28, 2026" },
  { id: "helen", name: "Helen Werleman", pets: "Milo (cat), Pip (bird)", phone: "+297 732 0045", account: "invite-pending", lastVisit: "Oct 1, 2026" },
  { id: "jan", name: "Jan Kock", pets: "Rocky (dog)", phone: "+297 588 1170", account: "walk-in", lastVisit: "Oct 1, 2026" },
  { id: "peter", name: "Peter Dijkhoff", pets: "Kira (dog)", phone: "+297 560 7781", account: "linked", lastVisit: "Sep 19, 2026" },
];

export const STOCK_PRODUCTS: StockProduct[] = [
  { id: "rabies", name: "Rabies vaccine, inactivated", sku: "MED-VAC-RAB-01", type: "Medication", onHand: 26, minimum: 10, nextExpiry: "Nov 30, 2026", status: "lot-expires" },
  { id: "dhpp", name: "DHPP vaccine", sku: "MED-VAC-DHP-01", type: "Medication", onHand: 34, minimum: 12, nextExpiry: "Mar 31, 2027", status: "in-stock" },
  { id: "carprofen", name: "Carprofen 50 mg", sku: "MED-PAI-CAR-050", type: "Medication", onHand: 0, minimum: 20, nextExpiry: "—", status: "out-of-stock" },
  { id: "flea", name: "Flea & tick chewable", sku: "MED-PAR-FTC-S", type: "Medication", onHand: 8, minimum: 10, nextExpiry: "Aug 31, 2027", status: "low-stock" },
  { id: "joint", name: "Joint support chews", sku: "SUP-JNT-060", type: "Supplement", onHand: 3, minimum: 5, nextExpiry: "Jan 31, 2029", status: "low-stock" },
  { id: "thermometer", name: "Digital thermometer", sku: "VET-DIA-THM-01", type: "Veterinary product", onHand: 6, minimum: 2, nextExpiry: "—", status: "in-stock" },
  { id: "lepto", name: "Leptospirosis vaccine", sku: "MED-VAC-LEP-01", type: "Medication", onHand: 9, minimum: 6, nextExpiry: "Jan 31, 2027", status: "in-stock" },
];

export const STOCK_STATS: AdminStat[] = [
  { label: "Products in stock", value: 131, caption: "of 148 active", icon: Calendar, tone: "default" },
  { label: "Low stock", value: 2, caption: "below minimum", icon: Box, tone: "warning" },
  { label: "Out of stock", value: 1, caption: "Carprofen 50 mg", icon: AlertTriangle, tone: "critical" },
  { label: "Expiring ≤ 90 days", value: 4, caption: "lots · use first", icon: Box, tone: "warning" },
  { label: "Expired", value: 1, caption: "lot blocked", icon: AlertTriangle, tone: "critical" },
];

export const PRODUCT_DETAIL: ProductDetail = {
  id: "rabies",
  category: "Vaccines",
  name: "Rabies vaccine, inactivated",
  overline: "Medication · Vaccines · SKU MED-VAC-RAB-01 · UUID 3F9C2A71-5B0E-4C1D-9A8F-61E4B2D7A21E",
  description: "1 mL single-dose vial · tracks lots and expiry · prescription only",
  usable: { value: 26, caption: "doses · minimum 10" },
  nextExpiry: { value: "60 days", caption: "RB-24187 · Nov 30, 2026" },
  blocked: { value: 2, caption: "expired · RB-23990" },
  lots: [
    { code: "RB-24187", expiry: "Nov 30, 2026", supplier: "Caribbean Vet Supply", received: "Mar 14, 2026", onHand: 6, status: "use-first" },
    { code: "RB-25033", expiry: "May 31, 2027", supplier: "Caribbean Vet Supply", received: "Sep 2, 2026", onHand: 20, status: "available" },
    { code: "RB-23990", expiry: "Sep 15, 2026", supplier: "Island Pharma", received: "Oct 3, 2025", onHand: 2, status: "expired-blocked" },
  ],
  movements: [
    { id: "m1", when: "Sep 30 · 4:12 PM", type: "clinical-use", detail: "Lot RB-24187 · Duke · Dr. Andreina", quantity: -1 },
    { id: "m2", when: "Sep 2 · 10:05 AM", type: "receipt", detail: "Lot RB-25033 · Caribbean Vet Supply · invoice 4471", quantity: 20 },
    { id: "m3", when: "Aug 28 · 5:40 PM", type: "adjustment", detail: "Lot RB-24187 · Count difference · Maria Kock", quantity: -1 },
  ],
};

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  { id: "rabies", family: "rabies", name: "Rabies vaccine, inactivated", description: "1 ml single-dose vial · dogs & cats · Vaccines", sku: "MED-MED-VAC-RAB-01", uuid: "3f9c2a71…a21e", stock: 42, low: false, unit: "doses" },
  { id: "carprofen-25", family: "carprofen", name: "Carprofen 25 mg", description: "Tablets · 25 mg · box of 14 · Pain & inflammation", sku: "MED-PAI-CAR-025", uuid: "7d41…0b2c", stock: 18, low: false, unit: "tablets" },
  { id: "carprofen-50", family: "carprofen", name: "Carprofen 50 mg", description: "Tablets · 50 mg · box of 14 · Pain & inflammation", sku: "MED-PAI-CAR-050", uuid: "2c8e…91fa", stock: 42, low: false, unit: "tablets" },
  { id: "carprofen-100", family: "carprofen", name: "Carprofen 100 mg", description: "Tablets · 100 mg · box of 14 · Pain & inflammation", sku: "MED-PAI-CAR-100", uuid: "a913…5e07", stock: 3, low: true, unit: "tablets" },
];

export const SUPPLIER_NAMES = ["Caribbean Vet Supply", "Island Pharma", "MedEquip Curaçao", "PetCare Distributors"];

export const RECEIPT_DEFAULTS = {
  supplier: "Caribbean Vet Supply",
  invoice: "INV-4512",
  receivedOn: "10 / 01 / 2026",
};

export const RECEIPT_LINES: ReceiptLine[] = [
  { id: "line-1", productId: "rabies", lot: "RB-25190", expiry: "06 / 30 / 2027", quantity: "30 doses" },
  { id: "line-2", productId: "carprofen-50", lot: "CP-7802", expiry: "08 / 31 / 2026", quantity: "100 tablets" },
];

export const SUPPLIERS: Supplier[] = [
  { id: "cvs", name: "Caribbean Vet Supply", contact: "Luis Croes", phone: "+297 582 1100", email: "orders@cvs.aw", lastDelivery: "Sep 2, 2026" },
  { id: "island", name: "Island Pharma", contact: "Nadia Wever", phone: "+297 583 4422", email: "sales@islandpharma.aw", lastDelivery: "Aug 14, 2026" },
  { id: "medequip", name: "MedEquip Curaçao", contact: "Pieter Martis", phone: "+599 9 461 2200", email: "info@medequip.cw", lastDelivery: "Jun 30, 2026" },
  { id: "petcare", name: "PetCare Distributors", contact: "Ana Tromp", phone: "+297 587 9001", email: "hello@petcare.aw", lastDelivery: "May 20, 2026" },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: "shirley", name: "Dr. Shirley", userId: "USR-1a7f", staffId: "STF-0001", role: "veterinarian", clinicalNo: "VET-002", clinicalLabel: "Vet number", location: "Main clinic", twoStep: "on", status: "active" },
  { id: "larry", name: "Dr. Larry", userId: "USR-03bc", staffId: "STF-0002", role: "veterinarian", clinicalNo: "VET-001", clinicalLabel: "Vet number", location: "Main clinic", twoStep: "on", status: "active" },
  { id: "andreina", name: "Dr. Andreina", userId: "USR-9e12", staffId: "STF-0003", role: "veterinarian", clinicalNo: "VET-003", clinicalLabel: "Vet number", location: "Main clinic", twoStep: "not-set-up", status: "active" },
  { id: "ricardo", name: "Dr. Ricardo", userId: "USR-4d80", staffId: "STF-0004", role: "veterinarian", clinicalNo: "VET-004", clinicalLabel: "Vet number", location: "Main clinic", twoStep: "on", status: "active" },
  { id: "maria", name: "Maria Kock", userId: "USR-77a1", staffId: "STF-0005", role: "administrator", clinicalNo: "–", clinicalLabel: "Not clinical", location: "All locations", twoStep: "on", status: "active" },
  { id: "jose", name: "José Ruiz", userId: "—", staffId: "STF-0006", role: "assistant", clinicalNo: "AST-001", clinicalLabel: "Assistant number", location: "Main clinic", twoStep: "none", status: "invited" },
];

export const WORKING_HOURS_OWNER = "Dr. Shirley";

export const WORKING_DAYS: WorkingDay[] = [
  { day: "Mon", shifts: ["8:00 – 12:00", "14:00 – 18:00"] },
  { day: "Tue", shifts: ["8:00 – 12:00", "14:00 – 18:00"] },
  { day: "Wed", shifts: ["8:00 – 13:00"] },
  { day: "Thu", shifts: ["8:00 – 12:00", "14:00 – 18:00"] },
  { day: "Fri", shifts: ["8:00 – 12:00", "14:00 – 17:00"] },
  { day: "Sat", shifts: ["9:00 – 13:00"] },
  { day: "Sun", shifts: [] },
];

export const SERVICE_ROWS: ServiceRow[] = [
  { id: "consultation", name: "Consultation", duration: 30, online: true, vets: 3, buffer: 10, species: ["Dogs", "Cats", "Birds"], price: "From AWG 60" },
  { id: "vaccination", name: "Vaccination", duration: 20, online: true, vets: 2, buffer: 10, species: ["Dogs", "Cats"], price: "From AWG 45" },
  { id: "follow-up", name: "Treatment follow-up", duration: 20, online: false, vets: 3, buffer: 10, species: ["Dogs", "Cats"], price: "" },
];

export const CATALOG_ROWS: CatalogRow[] = [
  { id: "rabies", name: "Rabies vaccine, inactivated", detail: "1 ml single-dose vial", sku: "MED-MED-VAC-RAB-…", uuid: "3f9c2a71-…-a21e", category: "Vaccines", type: "Medication", prescription: "rx", published: true },
  { id: "flea", name: "Flea & tick chewable", detail: "Chewable · dogs 2–4.5 kg", sku: "MED-PAR-FTC-S", uuid: "8b10d4e2-…-77c3", category: "Parasite control", type: "Medication", prescription: "rx", published: true },
  { id: "joint", name: "Joint support chews", detail: "Glucosamine + MSM · 60 chews", sku: "SUP-JNT-060", uuid: "c45e9f03-…-1b8d", category: "Joint care", type: "Supplement", prescription: "otc", published: true },
  { id: "omega", name: "Omega-3 fish oil", detail: "Liquid · 250 ml", sku: "SUP-SKN-03-250", uuid: "e7a2b6c9-…-4f0a", category: "Skin & coat", type: "Supplement", prescription: "otc", published: false },
  { id: "ear", name: "Ear cleaning solution", detail: "Bottle · 120 ml", sku: "VET-HYG-EAR-120", uuid: "19d7f3a8-…-c62e", category: "Hygiene", type: "Veterinary product", prescription: "otc", published: true },
];

export const ADMIN_APPOINTMENTS: AdminAppointment[] = [
  { id: "a1", date: "Fri, Oct 9", time: "10:15", patient: "Luna", species: "dog", owner: "Anna Lee", service: "Consultation", vet: "Dr. Andreina", source: "Phone", status: "in-progress" },
  { id: "a2", date: "Fri, Oct 9", time: "11:00", patient: "Coco", species: "cat", owner: "M. Ras", service: "Vaccination", vet: "Dr. Andreina", source: "Online", status: "booked-online" },
  { id: "a3", date: "Fri, Oct 2", time: "9:00", patient: "Bruno", species: "dog", owner: "L. Geerman", service: "Consultation", vet: "Dr. Shirley", source: "Online", status: "scheduled" },
  { id: "a4", date: "Wed, Oct 7", time: "9:45", patient: "Luna", species: "dog", owner: "Anna Lee", service: "Vaccination", vet: "Dr. Shirley", source: "Online", status: "scheduled" },
  { id: "a5", date: "Wed, Sep 30", time: "16:00", patient: "Pip", species: "cat", owner: "H. Werlem…", service: "Consultation", vet: "Dr. Larry", source: "Walk-in", status: "cancelled" },
];

export const APPOINTMENT_FILTER_COUNTS = { all: 62, scheduled: 41, "booked-online": 12, completed: 14, cancelled: 4, "no-show": 3 };

export const CLIENT_FILTER_COUNTS = { all: "1,284", linked: 612, "walk-in": 672 };

export const LOCATION: LocationInfo = {
  name: "Main clinic",
  subtitle: "Main clinic · America/Aruba (UTC−4)",
  phone: "+297 593 0404",
  whatsapp: "+297 593 0404",
  hours: [
    { label: "Mon – Fri", hours: "8:00 AM – 6:00 PM" },
    { label: "Saturday", hours: "9:00 AM – 1:00 PM" },
    { label: "Sunday", hours: "Closed" },
  ],
  closures: [
    { id: "c1", date: "Oct 10, 2026", note: "Staff training · full day" },
    { id: "c2", date: "Dec 25, 2026", note: "Christmas Day" },
  ],
};

export const BOOKING_RULES: BookingRules = {
  notice: "2 hours",
  horizon: "60 days",
  rescheduleWindow: "24 hours before",
  maxUpcoming: "3",
  slotInterval: "10 minutes",
  maxPerSlot: "5",
  autoConfirm: true,
  chooseVet: false,
};
