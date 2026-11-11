"use client";

import { useServerInsertedHTML } from "next/navigation";

export function ThemeInitScript({ script }: { script: string }) {
  useServerInsertedHTML(() => (
    <script
      id="theme-init-script"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  ));

  return null;
}
