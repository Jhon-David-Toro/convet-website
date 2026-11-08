import "server-only";

import { cookies } from "next/headers";
import { connection } from "next/server";
import type { ZodType } from "zod";

import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/session.constants";

import { API_TIMEOUT_MS, API_URL_ENV } from "./api.constants";
import { ApiError, fieldErrorsFrom, kindFromStatus } from "./api.errors";
import type { ApiRequestOptions } from "./api.types";

/**
 * Builds the absolute URL of an endpoint.
 *
 * @param path Path of the endpoint, e.g. `/pets/owner/123`.
 * @param query Query string values; empty ones are dropped.
 * @returns The URL to call.
 * @throws {ApiError} `not-configured` when the base URL variable is missing.
 */
export function buildUrl(path: string, query: ApiRequestOptions<unknown>["query"] = {}): URL {
  const base = process.env[API_URL_ENV];
  if (!base) throw new ApiError("not-configured", { detail: `${API_URL_ENV} is not set` });
  const url = new URL(path.replace(/^\//, ""), base.endsWith("/") ? base : `${base}/`);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }
  return url;
}

/**
 * Reads the access token from the httpOnly cookie.
 *
 * @returns The token.
 * @throws {ApiError} `unauthorized` when there is no session.
 */
async function accessToken(): Promise<string> {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;
  if (!token) throw new ApiError("unauthorized", { detail: "no access token cookie" });
  return token;
}

/**
 * Sends the request, turning a network failure or a timeout into an {@link ApiError}.
 *
 * @param url Address to call.
 * @param init Options of `fetch` without the signal, including how the answer is cached.
 * @param timeoutMs Time to wait for the answer.
 * @returns The response, whatever its status.
 */
async function send(url: URL, init: RequestInit, timeoutMs: number): Promise<Response> {
  try {
    return await fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
  } catch (error) {
    const timedOut = error instanceof DOMException && (error.name === "TimeoutError" || error.name === "AbortError");
    throw new ApiError(timedOut ? "timeout" : "network", { detail: String(error) });
  }
}

/**
 * Headers of a request: JSON in and out, plus the Bearer token for authenticated calls.
 *
 * @param auth Whether the call needs the session token.
 * @param hasBody Whether the call sends a JSON body.
 * @returns The headers.
 */
async function buildHeaders(auth: boolean, hasBody: boolean): Promise<Record<string, string>> {
  return {
    Accept: "application/json",
    ...(hasBody && { "Content-Type": "application/json" }),
    ...(auth && { Authorization: `Bearer ${await accessToken()}` }),
  };
}

/**
 * Turns the answer into data: a failed status becomes an {@link ApiError}, a good one is validated against the schema.
 *
 * @param response Answer of the backend.
 * @param schema Schema of the expected JSON; leave it out for answers without a body.
 * @returns The validated data, or `undefined` when there is no schema.
 * @throws {ApiError} For a failed status or an answer that does not match the schema.
 */
async function readAnswer<Output>(response: Response, schema?: ZodType<Output>): Promise<Output> {
  const payload: unknown = await response.json().catch(() => undefined);
  const { status } = response;

  if (!response.ok) {
    const kind = kindFromStatus(status);
    throw new ApiError(kind, { status, fieldErrors: kind === "validation" ? fieldErrorsFrom(payload) : undefined });
  }
  if (!schema) return undefined as Output;

  const parsed = schema.safeParse(payload);
  if (!parsed.success) throw new ApiError("invalid-response", { status, detail: parsed.error.message });
  return parsed.data;
}

/**
 * How `fetch` caches the answer: public reads with `revalidate` go to the Next.js data cache, everything else is fetched fresh.
 *
 * @param options Options of the request.
 * @returns The cache options of `fetch`.
 */
function cacheOptions(options: ApiRequestOptions<unknown>): Pick<RequestInit, "cache" | "next"> {
  if (options.revalidate === undefined) return { cache: "no-store" };
  return { next: { revalidate: options.revalidate, tags: options.tags } };
}

/**
 * Calls the backend from the server. It adds the Bearer token from the httpOnly cookie (the token never reaches the browser),
 * aborts after a timeout, turns every failure into an {@link ApiError} and validates the answer against the schema.
 *
 * @param path Path of the endpoint, e.g. `/pets`.
 * @param options Method, body, query, auth, schema and cache, see {@link ApiRequestOptions}.
 * @returns The validated JSON answer, or `undefined` for answers without a body.
 * Private calls wait for the incoming request first, so a page that calls the backend is never prerendered at build time: without it,
 * a missing `BACKEND_API_URL` during the build would make the call fail before any request data is read and Next.js would freeze the
 * resulting redirect into a static page. Public reads with `revalidate` skip that wait so their pages can be prerendered and refreshed
 * in the background; they never send the token, and their callers must fall back to static content when they fail.
 * @throws {ApiError} For every failure: no session, HTTP errors, network, timeout or an answer that does not match the schema.
 */
export async function apiRequest<Output = undefined>(path: string, options: ApiRequestOptions<Output> = {}): Promise<Output> {
  const cached = options.revalidate !== undefined;
  if (!cached) await connection();
  const { method = "GET", body, query, schema, timeoutMs = API_TIMEOUT_MS } = options;
  const auth = !cached && (options.auth ?? true);
  const url = buildUrl(path, query);
  const headers = await buildHeaders(auth, body !== undefined);
  const init = { method, headers, body: body === undefined ? undefined : JSON.stringify(body), ...cacheOptions(options) };
  const response = await send(url, init, timeoutMs);
  return readAnswer(response, schema);
}
