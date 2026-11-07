import type { ZodType } from "zod";

import type { ERROR_MESSAGES } from "./api.constants";

/** Category of a failed call, used by the UI to decide what to show. */
export type ApiErrorKind = keyof typeof ERROR_MESSAGES;

/** Validation messages by field, as the backend reports them on a 400/422. */
export type FieldErrors = Record<string, string>;

export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type ApiRequestOptions<Output> = {
  method?: HttpMethod;
  /** JSON body; send only the fields of the DTO, the backend rejects the rest. */
  body?: unknown;
  /** Query string; `undefined` and empty values are left out. */
  query?: Record<string, string | number | boolean | undefined>;
  /** Sends the access token of the session. Defaults to `true`; use `false` for public endpoints. */
  auth?: boolean;
  /** Schema that validates the JSON answer. Leave it out for answers without a body. */
  schema?: ZodType<Output>;
  /** Overrides the default timeout, in milliseconds. */
  timeoutMs?: number;
};

/** Result of a Server Action: either the data or a safe, user-facing error. */
export type ActionResult<Data = void> =
  | { ok: true; data: Data }
  | { ok: false; kind: ApiErrorKind; message: string; fieldErrors?: FieldErrors };
