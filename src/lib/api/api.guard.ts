import "server-only";

import { redirect } from "next/navigation";

import { SIGN_IN_PATH } from "./api.constants";
import { ApiError } from "./api.errors";
import type { ActionResult } from "./api.types";

/**
 * Loads data in a Server Component. An expired session sends the user to the sign-in page; any other failure is
 * handed back as an {@link ApiError} so the page can show its error state instead of crashing.
 *
 * @param load Function that calls the backend.
 * @returns The data, or the error to show.
 */
export async function loadData<Data>(load: () => Promise<Data>): Promise<{ data: Data; error?: undefined } | { data?: undefined; error: ApiError }> {
  try {
    return { data: await load() };
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.kind === "unauthorized") redirect(SIGN_IN_PATH);
      return { error };
    }
    throw error;
  }
}

/**
 * Runs a mutation for a Server Action and turns failures into a result the form can show.
 *
 * @param run Function that calls the backend.
 * @returns The data on success, or a safe error message with the field errors the backend reported.
 */
export async function runAction<Data = undefined>(run: () => Promise<Data>): Promise<ActionResult<Data>> {
  try {
    return { ok: true, data: await run() };
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.kind === "unauthorized") redirect(SIGN_IN_PATH);
      return { ok: false, kind: error.kind, message: error.message, fieldErrors: error.fieldErrors };
    }
    return { ok: false, kind: "server", message: "Something went wrong. Please try again." };
  }
}
