import type { LucideIcon } from "lucide-react";

import { Bird, Cat, Dog, Paw, User } from "@/components/ui/Icon";

import type { AvatarSize, AvatarSubject } from "./Avatar.types";

export const AVATAR_GLYPHS: Record<AvatarSubject, LucideIcon> = { dog: Dog, cat: Cat, bird: Bird, horse: Paw, person: User };

export const AVATAR_GLYPH_SIZES: Record<AvatarSize, number> = { small: 18, medium: 26, large: 44 };
