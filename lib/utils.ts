import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert an avatar icon key like `UI_AvatarIcon_Mizuki` to
 * the gacha avatar image key `UI_Gacha_AvatarImg_Mizuki`.
 * Falls back to the original string if no known prefix is found.
 */
export function avatarIconToGacha(icon: string) {
  if (typeof icon !== "string") return icon;
  return icon.replace(/^UI_AvatarIcon_/, "UI_Gacha_AvatarImg_");
}
