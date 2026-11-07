import { ERROR_MESSAGES } from "./api.constants";
import type { ApiErrorKind, FieldErrors } from "./api.types";

/** Error of a call to the backend. Its `message` is safe to show to the user; `detail` is for logs only. */
export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly fieldErrors?: FieldErrors;
  readonly detail?: string;

  /**
   * @param kind Category of the failure.
   * @param init Optional HTTP status, field errors and technical detail.
   * @param init.status HTTP status of the answer, when there was one.
   * @param init.fieldErrors Validation messages by field.
   * @param init.detail Technical detail that is never shown to the user.
   */
  constructor(kind: ApiErrorKind, init: { status?: number; fieldErrors?: FieldErrors; detail?: string } = {}) {
    super(ERROR_MESSAGES[kind]);
    this.name = "ApiError";
    this.kind = kind;
    this.status = init.status;
    this.fieldErrors = init.fieldErrors;
    this.detail = init.detail;
  }
}

/**
 * Maps an HTTP status to the kind of failure it means.
 *
 * @param status Status code of a non-2xx answer.
 * @returns The kind of error.
 */
export function kindFromStatus(status: number): ApiErrorKind {
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 404) return "not-found";
  if (status === 409) return "conflict";
  if (status === 400 || status === 422) return "validation";
  return "server";
}

/**
 * Reads the validation messages out of a NestJS error body (`{ message: string | string[] }` from `class-validator`).
 * Each message starts with the property name, e.g. `"name should not be empty"`, which gives the field.
 *
 * @param body Parsed JSON body of the error answer.
 * @returns Messages by field; an empty object when the body has none.
 */
export function fieldErrorsFrom(body: unknown): FieldErrors {
  if (typeof body !== "object" || body === null || !("message" in body)) return {};
  const { message } = body;
  const messages = Array.isArray(message) ? message : typeof message === "string" ? [message] : [];
  const errors: FieldErrors = {};
  for (const text of messages) {
    if (typeof text !== "string") continue;
    const field = text.split(" ")[0];
    if (field && !(field in errors)) errors[field] = text;
  }
  return errors;
}
