import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef, DragEvent, ReactNode } from "react";

export type FileUploadProps = Omit<
  ComponentPropsWithRef<"div">,
  "children" | "title" | "onDrop" | "onDragOver" | "onDragLeave"
> & {
  title?: string;
  draggingTitle?: string;
  hint?: string;
  accept?: string;
  name?: string;
  disabled?: boolean;
  file?: { name: string; description: string };
  error?: { title: string; hint?: string };
  removeLabel?: string;
  onFileSelect?: (file: File) => void;
  onFileRemove?: () => void;
};

export type FileUploadStatus = "idle" | "uploaded" | "error";

export type FileUploadView = {
  glyph: LucideIcon;
  heading?: string;
  detail?: string;
};

export type FileUploadContentProps = {
  view: FileUploadView;
  title: string;
  draggingTitle: string;
};

export type UseFileDropParams = Pick<FileUploadProps, "disabled" | "onFileSelect">;

export type FileDropHandlers = {
  dragging: boolean;
  onDragOver: (event: DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (event: DragEvent) => void;
};

export type UploadDropzoneProps = Pick<FileUploadProps, "name" | "accept" | "disabled" | "onFileSelect"> & {
  content: ReactNode;
  drop: FileDropHandlers;
};

export type UploadedFileProps = Pick<FileUploadProps, "removeLabel" | "onFileRemove"> & {
  content: ReactNode;
};

export type UploadStatusParams = Pick<FileUploadProps, "file" | "error">;

export type UploadViewParams = Pick<FileUploadProps, "file" | "error" | "hint">;
