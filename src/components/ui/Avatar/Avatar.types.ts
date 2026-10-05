import type { ComponentPropsWithRef } from "react";

/** Avatar subject: `dog`, `cat`, `person`. */
export type AvatarSubject = "dog" | "cat" | "person";

/** Avatar size: `small`, `medium`, `large`. */
export type AvatarSize = "small" | "medium" | "large";

/** Props of the `Avatar` component. */
export type AvatarProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  /** What the avatar or image represents (dog, cat, person…). */
  subject: AvatarSubject;
  /** Size of the component. */
  size?: AvatarSize;
  /** When omitted, the avatar is decorative and hidden from assistive technology. */
  label?: string;
};
