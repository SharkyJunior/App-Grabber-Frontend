"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { registerToast } from "./toast-manager";

export type ToastVariant = "info" | "success" | "error" | "warning";

export type Toast = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastContextType = {
  toast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = Math.random().toString(36).substring(2, 9);

      setToasts((prev) => [...prev, { id, message, variant }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    [],
  );

  // Bridge the imperative API (showToast) to this React context
  useEffect(() => {
    registerToast(toast);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg transition-all animate-in slide-in-from-bottom-5 fade-in duration-200",

              t.variant === "info" &&
                "border-info-border bg-info-subtle text-info",
              t.variant === "success" &&
                "border-success-border bg-success-subtle text-success",
              t.variant === "error" &&
                "border-error-border bg-error-subtle text-error",
              t.variant === "warning" &&
                "border-warning-border bg-warning-subtle text-warning",
            )}
          >
            <span>{t.message}</span>

            <button
              onClick={() =>
                setToasts((prev) => prev.filter((x) => x.id !== t.id))
              }
              className="opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1 focus:ring-offset-transparent"
              aria-label="Закрыть"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// --- Hook for React Components ---
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
}
