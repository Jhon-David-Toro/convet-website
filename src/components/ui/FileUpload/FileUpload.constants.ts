import { AlertTriangle, File as FileIcon, Upload } from "@/components/ui/Icon";

/** Size in px of the status icon (upload, file or error). */
export const FILE_UPLOAD_ICON_SIZE = 22;

/** Icon shown for each status of the upload zone. */
export const FILE_UPLOAD_GLYPHS = { idle: Upload, uploaded: FileIcon, error: AlertTriangle } as const;

/** ARIA role of the zone for each status: an error is announced as an alert. */
export const FILE_UPLOAD_ROLES = { idle: undefined, uploaded: undefined, error: "alert" } as const;

/** Status of a zone that already holds a file. */
export const UPLOADED_STATUS = "uploaded";
