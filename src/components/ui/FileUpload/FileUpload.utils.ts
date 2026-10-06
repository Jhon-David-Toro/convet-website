import { FILE_UPLOAD_GLYPHS } from "./FileUpload.constants";
import type { FileUploadStatus, FileUploadView, UploadStatusParams, UploadViewParams } from "./FileUpload.types";

/**
 * Resolves the status of the zone: an error wins over an uploaded file.
 *
 * @param params Options, see {@link UploadStatusParams}.
 * @param params.file Already uploaded file: replaces the drop zone with its name and a button to remove it.
 * @param params.error Validation error: takes priority over the idle state.
 * @returns The status of the zone: an error wins over an uploaded file.
 */
export const getUploadStatus = ({ file, error }: UploadStatusParams): FileUploadStatus => {
  if (error) return "error";
  return file ? "uploaded" : "idle";
};

/**
 * Resolves the icon and texts the zone shows for its status.
 *
 * @param params Options, see {@link UploadViewParams}.
 * @param params.file Already uploaded file: replaces the drop zone with its name and a button to remove it.
 * @param params.error Validation error: takes priority over the idle state.
 * @param params.hint Helper text shown under the main text.
 * @returns The icon and texts the zone shows for its status.
 */
export const getUploadView = ({ file, error, hint }: UploadViewParams): FileUploadView => {
  const status = getUploadStatus({ file, error });
  const glyph = FILE_UPLOAD_GLYPHS[status];

  if (status === "uploaded") return { glyph, heading: file?.name, detail: file?.description };
  if (status === "error") return { glyph, heading: error?.title, detail: error?.hint };
  return { glyph, detail: hint };
};
