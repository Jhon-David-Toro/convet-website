"use client";

import { useState } from "react";

import styles from "./CustomerAppointments.module.scss";
import type { AppointmentTab, CustomerAppointmentsProps } from "./CustomerAppointments.types";
import { defaultGroups } from "./CustomerAppointments.utils";
import { useAppointments } from "./hooks/useAppointments";
import { useCancelFlow } from "./hooks/useCancelFlow";
import { AppointmentList } from "./parts/AppointmentList";
import { AppointmentTabs } from "./parts/AppointmentTabs";
import { AppointmentsHeader } from "./parts/AppointmentsHeader";
import { CancelModal } from "./parts/CancelModal";
import { ChangeAlert } from "./parts/ChangeAlert";

/**
 * Appointments page: title with the booking button, tabs by state, the appointments of the selected tab, the 24-hour notice and the
 * cancel dialog (opened by `?cancel=<id>`). Cancelling moves the appointment to the cancelled tab and shows a toast with "Undo".
 *
 * @param props Props of the component, see {@link CustomerAppointmentsProps}.
 * @param props.groups Appointments of every tab; by default the ones of the customer.
 * @returns The rendered element.
 */
export function CustomerAppointments({ groups: initial = defaultGroups() }: CustomerAppointmentsProps) {
  const [tab, setTab] = useState<AppointmentTab>("upcoming");
  const state = useAppointments(initial);
  const cancelFlow = useCancelFlow(state);

  return (
    <div className={styles.page}>
      <AppointmentsHeader />
      <AppointmentTabs groups={state.groups} tab={tab} onChange={setTab} />
      <AppointmentList tab={tab} appointments={state.groups[tab]} />
      <ChangeAlert />
      <CancelModal appointment={cancelFlow.target} onClose={cancelFlow.close} onConfirm={cancelFlow.confirm} />
    </div>
  );
}
