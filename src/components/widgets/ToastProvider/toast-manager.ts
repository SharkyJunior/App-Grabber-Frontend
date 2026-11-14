import type { ToastVariant } from "./ToastProvider";

let globalToastFn: ((message: string, variant?: ToastVariant) => void) | null =
  null;

export function registerToast(fn: typeof globalToastFn) {
  globalToastFn = fn;
}

export function showToast(message: string, variant?: ToastVariant) {
  if (globalToastFn) {
    globalToastFn(message, variant);
  } else {
    console.warn("ToastProvider is not mounted yet:", message);
  }
}
