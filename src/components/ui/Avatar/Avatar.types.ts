import type { ComponentPropsWithRef } from "react";

export type AvatarSubject = "dog" | "cat" | "bird" | "horse" | "person";

export type AvatarSize = "small" | "medium" | "large";

export type AvatarProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  subject: AvatarSubject;
  size?: AvatarSize;
  label?: string;
};
