"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { FavoriteButton } from "./FavoriteButton";

const copyPopupStyles = `
  @keyframes copyPopupAppear {
    0% {
      opacity: 0;
      transform: translateY(-50px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes copyPopupDisappear {
    0% {
      transform: translateX(0) scale(1);
    }
    100% {
      transform: translateX(100vw) scale(1.05);
    }
  }

  .copy-popup-enter {
    animation: copyPopupAppear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .copy-popup-exit {
    animation: copyPopupDisappear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .copy-dot-pulse {
    animation: dotBounce 1.2s ease-out infinite;
  }

  @keyframes dotBounce {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.4);
      opacity: 0.5;
    }
  }
`;

function useCopyAnimationStyles() {
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = copyPopupStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
}

type AppHeaderProps = {
  name: string;
  developer: string;
  package_name: string;
  letter: string;
  iconUrl?: string | null;
  availableStore?: string;
  onSave?: () => void;
  onExportJson?: () => void;
  onCompare?: () => void;
  compareLabel?: string;
  className?: string;
};

export function AppHeader({
  name,
  developer,
  package_name,
  letter,
  iconUrl = null,
  availableStore,
  onExportJson,
  onCompare,
  compareLabel = "Сравнить",
  className,
}: AppHeaderProps) {
  useCopyAnimationStyles();

  return (
    <section
      className={cn(
        "flex items-center gap-6 rounded-2xl border border-[#DCDFD8] bg-white p-6",
        className,
      )}
    >
      {iconUrl ? (
        <Image
          className="rounded-2xl shadow-lg"
          src={iconUrl}
          height="112"
          width="112"
          alt="app icon"
        ></Image>
      ) : (
        <div
          aria-hidden="true"
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-5xl font-bold text-blue-600"
        >
          {letter}
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div>
          <div className="flex gap-2">
            <h1 className="text-3xl font-bold leading-tight text-black">
              {name}
            </h1>
            <FavoriteButton packageName={package_name} />
          </div>
          <p className="text-lg text-neutral-500">{developer}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-lg bg-neutral-100 px-3 py-1 font-mono text-base text-neutral-800">
            {package_name}
          </span>
          <CopyButton value={package_name} />
          {availableStore && (
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600 px-3 py-1 text-sm font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              {availableStore}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Button
          onClick={onExportJson}
          className="border-2 border-blue-600 bg-white px-6 py-3 text-base font-bold text-blue-600 hover:bg-blue-50"
        >
          Экспорт JSON
        </Button>
        <Button
          onClick={onCompare}
          className="border-2 border-blue-600 bg-white px-6 py-3 text-base font-bold text-blue-600 hover:bg-blue-50"
        >
          {compareLabel}
        </Button>
      </div>
    </section>
  );
}

function CopyButton({
  value,
  copiedPopupRef,
}: {
  value: string;
  copiedPopupRef?: React.RefObject<HTMLElement | null>;
}) {
  const [isCopied, setIsCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = React.useCallback(() => {
    const popup = copiedPopupRef?.current;
    if (popup) {
      popup.classList.add("copy-popup-enter");
      void popup.offsetWidth;
      popup.classList.remove("copy-popup-enter");
      popup.classList.add("copy-popup-exit");
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (popup) {
          popup.classList.remove("copy-popup-exit");
        }
        setIsCopied(false);
      }, 2000);
    });
  }, [value, copiedPopupRef]);

  return (
    <>
      <button
        type="button"
        aria-label="Скопировать"
        onClick={handleCopy}
        className="rounded p-1 text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`h-5 w-5 transition-colors ${
            isCopied ? "text-green-600" : ""
          }`}
        >
          <rect x="6" y="6" width="10" height="10" rx="1.5" />
          <path d="M4 14V5a1 1 0 011-1h9" />
        </svg>
      </button>

      {isCopied && (
        <div className="pointer-events-none fixed inset-x-0 top-8 z-50 flex justify-center px-4">
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 shadow-lg ring-1 ring-black/5 copy-popup-enter"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center copy-dot-pulse">
              <span
                className="absolute h-2.5 w-2.5 rounded-full bg-green-500"
                style={{ animation: "copyDotPulse 1.2s ease-out infinite" }}
              />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium text-gray-800">
              Скопировано в буфер обмена
            </span>
          </div>
        </div>
      )}
    </>
  );
}
