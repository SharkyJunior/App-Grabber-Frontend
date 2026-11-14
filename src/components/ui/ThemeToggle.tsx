"use client";

import { ComponentType, useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { AutoThemeIcon, DarkThemeIcon, LightThemeIcon } from "../icons";

type Theme = "light" | "dark" | "system";
const STORAGE_KEY = "theme";
const THEME_EVENT = "themechange";

const OPTIONS: { value: Theme; Icon: ComponentType<{ className?: string }> }[] =
  [
    { value: "light", Icon: LightThemeIcon },
    { value: "dark", Icon: DarkThemeIcon },
    { value: "system", Icon: AutoThemeIcon },
  ];

const LABELS: Record<Theme, string> = {
  light: "Светлая тема",
  dark: "Тёмная тема",
  system: "Системная тема",
};

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_EVENT, callback);
  mql.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_EVENT, callback);
    mql.removeEventListener("change", callback);
  };
}

function getTheme(): Theme {
  return (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "system";
}

function getSystemDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getTheme,
    () => "system" as Theme,
  );
  const systemDark = useSyncExternalStore(
    subscribe,
    getSystemDark,
    () => false,
  );

  useEffect(() => {
    const isDark = theme === "dark" || (theme === "system" && systemDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, [theme, systemDark]);

  const update = (next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <div
      role="radiogroup"
      aria-label="Тема оформления"
      className="flex ml-auto items-center gap-1 rounded-xl border border-border bg-surface p-1"
    >
      {OPTIONS.map(({ value, Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          aria-label={LABELS[value]}
          onClick={() => update(value)}
          className={cn(
            "rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            theme === value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-text hover:text-foreground",
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
}
