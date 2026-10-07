/**
 * Opens the dialog as a modal and moves focus to the control marked with `data-autofocus`, if any.
 *
 * @param dialog Native dialog element, or `null` before it mounts.
 */
function openModal(dialog: HTMLDialogElement): void {
  dialog.showModal();
  // The browser focuses the first control; an element with data-autofocus takes priority
  dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
}

/**
 * Makes the native `<dialog>` match the `open` prop: opens it as a modal or closes it. Does nothing when already in sync.
 *
 * @param dialog Native dialog element, or `null` before it mounts.
 * @param open Whether the popup is open.
 */
export function syncDialog(dialog: HTMLDialogElement | null, open: boolean): void {
  if (!dialog || open === dialog.open) return;
  if (open) openModal(dialog);
  else dialog.close();
}
