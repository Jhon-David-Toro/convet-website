import { AlertTriangle, File as FileIcon, Upload } from "@/components/ui/Icon";

export const FILE_UPLOAD_ICON_SIZE = 22;

export const FILE_UPLOAD_GLYPHS = { idle: Upload, uploaded: FileIcon, error: AlertTriangle } as const;

export const FILE_UPLOAD_ROLES = { idle: undefined, uploaded: undefined, error: "alert" } as const;

export const UPLOADED_STATUS = "uploaded";
