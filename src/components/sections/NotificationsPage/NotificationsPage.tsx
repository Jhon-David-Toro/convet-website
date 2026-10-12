"use client";

import { useState } from "react";

import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { FilterChips } from "@/components/patterns/FilterChips";
import { NotificationList, useNotificationCenter } from "@/components/sections/NotificationCenter";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icon";
import { CATEGORIES, RETENTION_NOTES, SETTINGS_HREFS } from "@/lib/notifications/notifications.constants";
import { categoryCount, FILTER_ALL, FILTER_UNREAD, filterNotifications } from "@/lib/notifications/notifications.utils";

import { ALL_LABEL, EMPTY_TEXT, EMPTY_TITLE, FILTERS_LABEL, MARK_ALL_LABEL, SETTINGS_LABEL, SUBTITLE, TITLE, UNREAD_LABEL } from "./NotificationsPage.constants";
import styles from "./NotificationsPage.module.scss";

/**
 * Notifications page of an area: every notification grouped by day, filters for unread and categories, and how long they are kept.
 *
 * @returns The rendered element.
 */
export function NotificationsPage() {
  const { area, items, unread, markAllRead } = useNotificationCenter();
  const [filter, setFilter] = useState(FILTER_ALL);
  const shown = filterNotifications(items, filter);
  const options = [
    { value: FILTER_ALL, label: ALL_LABEL, count: items.length },
    { value: FILTER_UNREAD, label: UNREAD_LABEL, count: unread },
    ...CATEGORIES[area].map(({ value, label }) => ({ value, label, count: categoryCount(items, value) })),
  ];

  return (
    <PageStack>
      <PageHeader
        title={TITLE}
        subtitle={SUBTITLE}
        actions={
          <>
            <Button variant="secondary" size="small" leadingIcon={Check} disabled={unread === 0} onClick={markAllRead}>
              {MARK_ALL_LABEL}
            </Button>
            <Button variant="tertiary" size="small" href={SETTINGS_HREFS[area]}>
              {SETTINGS_LABEL}
            </Button>
          </>
        }
      />
      <FilterChips label={FILTERS_LABEL} options={options} value={filter} onChange={setFilter} />
      <div className={styles.list}>
        {shown.length > 0 ? <NotificationList items={shown} /> : <p className={styles.empty}>{EMPTY_TITLE}. {EMPTY_TEXT}</p>}
      </div>
      <Alert tone="info" title={RETENTION_NOTES[area].title}>
        {RETENTION_NOTES[area].text}
      </Alert>
    </PageStack>
  );
}
