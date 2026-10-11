import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { STAFF_HOME_HREF } from "@/lib/staff.paths.constants";

import { CLIENT_BREADCRUMB_CLIENTS, CLIENT_BREADCRUMB_HOME, CLIENTS_HREF } from "./ClientDetail.constants";
import styles from "./ClientDetail.module.scss";
import type { ClientDetailProps } from "./ClientDetail.types";
import { ClientAppointments } from "./parts/ClientAppointments";
import { ClientHeader } from "./parts/ClientHeader";
import { ClientPets } from "./parts/ClientPets";

/**
 * Client page of the staff area: the client card, their pets and their appointments.
 *
 * @param props Props of the component, see {@link ClientDetailProps}.
 * @param props.client Client of the page.
 * @returns The rendered element.
 */
export function ClientDetail({ client }: ClientDetailProps) {
  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: CLIENT_BREADCRUMB_HOME, href: STAFF_HOME_HREF }, { label: CLIENT_BREADCRUMB_CLIENTS, href: CLIENTS_HREF }, { label: client.name }]} />
      <ClientHeader client={client} />
      <div className={styles.columns}>
        <ClientPets pets={client.pets} />
        <ClientAppointments appointments={client.appointments} />
      </div>
    </div>
  );
}
