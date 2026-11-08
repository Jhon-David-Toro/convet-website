import type { ActionResult } from "@/lib/api/api.types";

export type ServerAction<Args extends unknown[], Data> = (...args: Args) => Promise<ActionResult<Data>>;

export type ActionToastState<Args extends unknown[], Data> = {
  pending: boolean;
  run: (...args: Args) => Promise<ActionResult<Data> | undefined>;
};
