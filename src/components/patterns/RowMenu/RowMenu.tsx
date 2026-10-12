"use client";

import Link from "next/link";

import { Dropdown } from "@/components/ui/Dropdown";
import { More } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { MenuItem } from "@/components/ui/MenuItem";
import { cx } from "@/lib/shared/cx";

import { MENU_ROLE } from "./RowMenu.constants";
import type { RowMenuProps } from "./RowMenu.types";
import { useRowMenu } from "./hooks/useRowMenu";
import styles from "./RowMenu.module.scss";

/**
 * Row/Menu: the "..." button of a table row and the list of actions it opens.
 *
 * @param props Props of the component, see {@link RowMenuProps}.
 * @param props.label Accessible name of the button.
 * @param props.items Actions of the menu; each one leads to a page or runs a function.
 * @param props.className Extra class name for the root element.
 * @returns The rendered element.
 */
export function RowMenu({ label, items, className }: RowMenuProps) {
  const { rootRef, open, toggle, close } = useRowMenu();

  return (
    <div ref={rootRef} className={cx(styles.root, className)}>
      <IconButton icon={More} label={label} variant="ghost" aria-haspopup={MENU_ROLE} aria-expanded={open} onClick={toggle} />
      {open && (
        <Dropdown role={MENU_ROLE} aria-label={label} className={styles.menu}>
          {items.map((item) => {
            const content = (
              <MenuItem icon={item.icon} tone={item.tone}>
                {item.label}
              </MenuItem>
            );
            return item.href ? (
              <Link key={item.label} href={item.href} role="menuitem" className={styles.link} onClick={close}>
                {content}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={styles.link}
                onClick={() => {
                  close();
                  item.onSelect?.();
                }}
              >
                {content}
              </button>
            );
          })}
        </Dropdown>
      )}
    </div>
  );
}
