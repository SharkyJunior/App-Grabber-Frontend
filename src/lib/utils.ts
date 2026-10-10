import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PACKAGE_NAME_RE = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/i;

export function isValidPackageName(value: string): boolean {
  return PACKAGE_NAME_RE.test(value);
}
