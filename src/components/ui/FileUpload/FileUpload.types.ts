import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef, DragEvent, ReactNode } from "react";

/** Props of the `FileUpload` component. */
export type FileUploadProps = Omit<
  ComponentPropsWithRef<"div">,
  "children" | "title" | "onDrop" | "onDragOver" | "onDragLeave"
> & {
  /** Text shown while idle. */
  title?: string;
  /** Text shown while a file is dragged over the zone. */
  draggingTitle?: string;
  /** Helper text shown under the main text. */
  hint?: string;
  /** File types the input accepts (same syntax as the HTML `accept` attribute). */
  accept?: string;
  /** Name to show. */
  name?: string;
  /** Whether the control is disabled. */
  disabled?: boolean;
  /** Already uploaded file: replaces the drop zone with its name and a button to remove it. */
  file?: { name: string; description: string };
  /** Validation error: takes priority over the idle state. */
  error?: { title: string; hint?: string };
  /** Accessible name of the remove button. */
  removeLabel?: string;
  /** Called with the chosen or dropped file. Validating size and type is up to the consumer. */
  onFileSelect?: (file: File) => void;
  /** Called when the user removes the uploaded file. */
  onFileRemove?: () => void;
};

/** Visual state of the upload zone. */
export type FileUploadStatus = "idle" | "uploaded" | "error";

/** What the zone shows for a given status. */
export type FileUploadView = {
  /** Glyph. */
  glyph: LucideIcon;
  /** Main line; `undefined` shows the idle and dragging titles instead. */
  heading?: string;
  /** Secondary line below the heading. */
  detail?: string;
};

/** Props of the inner content (icon and text) of the upload zone. */
export type FileUploadContentProps = {
  /** How the status is presented. */
  view: FileUploadView;
  /** Title text. */
  title: string;
  /** Text shown while a file is dragged over the zone. */
  draggingTitle: string;
};

/** Inputs of the `useFileDrop` hook. */
export type UseFileDropParams = Pick<FileUploadProps, "disabled" | "onFileSelect">;

/** Handlers and state of a drop zone. */
export type FileDropHandlers = {
  /** Whether dragging. */
  dragging: boolean;
  /** Called when drag over happens. */
  onDragOver: (event: DragEvent) => void;
  /** Called when drag leave happens. */
  onDragLeave: () => void;
  /** Called when drop happens. */
  onDrop: (event: DragEvent) => void;
};

/** Props of the zone shown while there is no uploaded file. */
export type UploadDropzoneProps = Pick<FileUploadProps, "name" | "accept" | "disabled" | "onFileSelect"> & {
  /** Prepared content to render. */
  content: ReactNode;
  /** Drag and drop state and handlers. */
  drop: FileDropHandlers;
};

/** Props of the row shown once a file is uploaded. */
export type UploadedFileProps = Pick<FileUploadProps, "removeLabel" | "onFileRemove"> & {
  /** Prepared content to render. */
  content: ReactNode;
};

/** What decides the status of the upload zone. */
export type UploadStatusParams = Pick<FileUploadProps, "file" | "error">;

/** What decides the icon and texts of the upload zone. */
export type UploadViewParams = Pick<FileUploadProps, "file" | "error" | "hint">;
