import type { AppointmentStatus } from "@/components/patterns/AppointmentCard";
import type { TimelineType } from "@/components/patterns/TimelineItem";
import type { VaccineStatus } from "@/components/patterns/VaccineRow";
import type { AvatarSubject } from "@/components/ui/Avatar";

export type PetItem = {
  id: string;
  name: string;
  subject: AvatarSubject;
  summary: string;
  profileLine: string;
  allergy?: string;
  microchip: string;
  weight: string;
  weightDate: string;
  vet: string;
  nextVisit?: string;
  vaccineStatus: VaccineStatus;
  vaccineBadge: string;
};

export type PetVaccine = {
  petId: string;
  name: string;
  stamp: string;
  status: VaccineStatus;
  dates: string;
  stampDate: string;
};

export type PetEvent = {
  id: string;
  petId: string;
  type: TimelineType;
  title: string;
  meta: string;
  summary: string;
  year: string;
};

export type WeightPoint = {
  label: string;
  value: number;
};

export type CustomerAppointment = {
  id: string;
  iso: string;
  startTime: string;
  vetId: string;
  serviceId: string;
  status: AppointmentStatus;
  month: string;
  day: string;
  weekday: string;
  service: string;
  time: string;
  pet: string;
  vet: string;
  location: string;
};

export type ReminderTone = "warning" | "error";

export type CustomerReminder = {
  id: string;
  tone: ReminderTone;
  title: string;
  text: string;
  actionLabel: string;
};

export type CustomerProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

export type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
};
