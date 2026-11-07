import { z } from "zod";

/**
 * Accepts a list sent either as a bare array or wrapped as `{ data: [...] }` / `{ items: [...] }`, and always returns the array.
 * The backend contract for collections is not confirmed yet, so this is the one place to change when it is.
 *
 * @param item Schema of one element.
 * @returns A schema that validates the list and unwraps it.
 */
export function collection<Item extends z.ZodType>(item: Item) {
  return z.union([z.array(item), z.object({ data: z.array(item) }).transform((body) => body.data), z.object({ items: z.array(item) }).transform((body) => body.items)]);
}

/** Text the backend may send as `null` or leave out. */
export const optionalText = z.string().nullish().transform((value) => value ?? undefined);
