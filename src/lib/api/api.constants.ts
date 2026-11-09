/** Name of the server-only variable that holds the base URL of the NestJS backend. */
export const API_URL_ENV = "BACKEND_API_URL";

/** Time the backend has to answer before the request is aborted, in milliseconds. */
export const API_TIMEOUT_MS = 10_000;

/** Page the user is sent to when the session is missing or has expired. */
export const SIGN_IN_PATH = "/sign-in";

export const ERROR_MESSAGES = {
  unauthorized: "Your session has expired. Please sign in again.",
  forbidden: "You do not have permission to do this.",
  "not-found": "We could not find what you were looking for.",
  conflict: "That information is already registered.",
  validation: "Some of the information is not valid. Please review it and try again.",
  server: "Something went wrong on our side. Please try again in a moment.",
  network: "We could not reach the server. Check your connection and try again.",
  timeout: "The server took too long to answer. Please try again.",
  "invalid-response": "The server sent an unexpected answer. Please try again later.",
  "not-configured": "The service is not configured. Please contact the clinic.",
} as const;
