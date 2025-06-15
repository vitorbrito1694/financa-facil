import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string): string {
  const names = fullName
    .trim()
    .split(" ")
    .filter((name) => name.length > 0);
  if (names.length === 0) return "";
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

export function getFirstAndLastName(fullName: string): string {
  const names = fullName
    .trim()
    .split(" ")
    .filter((name) => name.length > 0);
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  return names[0] + " " + names[names.length - 1];
}
