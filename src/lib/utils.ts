import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PACKAGE_NAME_RE = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/i;

export function isValidPackageName(value: string): boolean {
  return PACKAGE_NAME_RE.test(value);
}

export function formatRussianRelative(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const diffDays = Math.round((+today - +targetDay) / (1000 * 60 * 60 * 24));

  const timeStr = date.toLocaleString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diffDays === 0) {
    return `сегодня, ${timeStr}`;
  }
  if (diffDays === 1) {
    return `вчера, ${timeStr}`;
  }

  return date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isLink(text: string) {
  const trimmed = text.trim();

  // 1. Catch anything starting with a protocol (http, https, ftp, etc.)
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) return true;

  // 2. Catch domain names without protocols (e.g., play.google.com)
  // This looks for a dot followed by 2+ letters, optionally with a path
  if (/^([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(trimmed)) return true;

  // 3. Fallback: try the URL constructor (catches IP addresses, etc.)
  try {
    new URL(trimmed);
    return true;
  } catch {
    return false;
  }
}

export function pushCurrentHistory() {
  if (typeof window !== "undefined") {
    window.history.pushState(null, "", window.location.href);
  }
}
