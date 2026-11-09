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

/** Metadata of a paginated answer (`{ data, meta }`), as the reviews and medical records lists send it. */
export const pageMetaSchema = z.object({ total: z.number(), page: z.number(), limit: z.number(), totalPages: z.number() });

/** Amount of money: Prisma `Decimal` columns arrive as strings (`"45.00"`); numbers are accepted too. */
export const decimal = z.union([z.string(), z.number()]).transform((value) => Number(value)).pipe(z.number());

/**
 * Whether a route parameter is a UUID: the backend answers 400 for any other id, so pages can show their 404 straight away.
 *
 * @param value Route parameter.
 * @returns `true` for a UUID.
 */
export function isUuid(value: string): boolean {
  return z.uuid().safeParse(value).success;
}
