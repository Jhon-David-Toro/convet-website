import type { LucideIcon } from "lucide-react";

import { Cat, Dog, User } from "@/components/ui/Icon";

import type { AvatarSize, AvatarSubject } from "./Avatar.types";

/** Glyph drawn for each avatar subject. */
export const AVATAR_GLYPHS: Record<AvatarSubject, LucideIcon> = { dog: Dog, cat: Cat, person: User };

/** Glyph size in px per avatar size, as in Figma: 18 / 26 / 44 inside 32 / 48 / 80. */
export const AVATAR_GLYPH_SIZES: Record<AvatarSize, number> = { small: 18, medium: 26, large: 44 };
