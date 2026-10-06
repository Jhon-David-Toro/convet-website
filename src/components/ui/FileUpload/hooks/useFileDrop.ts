import { useState, type DragEvent } from "react";

import type { FileDropHandlers, UseFileDropParams } from "../FileUpload.types";

/**
 * Tracks a file dragged over a drop zone and reports the dropped file.
 *
 * @param params Options, see {@link UseFileDropParams}.
 * @param params.disabled Whether the control is disabled.
 * @param params.onFileSelect Called with the chosen or dropped file. Validating size and type is up to the consumer.
 * @returns Object with `dragging`, `onDragOver`, `onDragLeave`, `onDrop`.
 */
export function useFileDrop({ disabled, onFileSelect }: UseFileDropParams): FileDropHandlers {
  const [dragging, setDragging] = useState(false);

  /**
   * Accepts the drag when the zone is enabled and shows the dragging state.
   *
   * @param event Drag event.
   */
  const onDragOver = (event: DragEvent) => {
    if (disabled) return;
    event.preventDefault();
    setDragging(true);
  };

  /**
   * Ends the drag and reports the dropped file when the zone is enabled.
   *
   * @param event Drop event.
   */
  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files[0];
    if (!disabled && dropped) onFileSelect?.(dropped);
  };

  return { dragging, onDragOver, onDragLeave: () => setDragging(false), onDrop };
}
