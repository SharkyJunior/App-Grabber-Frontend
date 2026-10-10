"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn, isValidPackageName } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TagSelect } from "@/components/ui/TagSelect";
import { SearchWidgetProps } from "./types";
import { Error } from "@/components/ui/Error";

const invalidQueryText =
  "Это не похоже на package name. Он выглядит так: com.company.app";

export default function SearchWidget({
  placeholder = "com.example.app",
  onSearch,
  className,
}: SearchWidgetProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(["Google Play", "RuStore"]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    if (!isValidPackageName(query)) {
      setError(true);
      return;
    }

    setIsLoading(true);
    try {
      router.push(`/apps/${query}`);
      onSearch?.(query);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-[#DCDFD8] bg-white p-6 shadow-sm",
        className,
      )}
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => {
            if (error) setError(false);
            setQuery(e.target.value);
          }}
          placeholder={placeholder}
          className="flex-1"
          variant={isValidPackageName(query) ? "" : "error"}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Ищем..." : "Поиск"}
        </Button>
      </form>
      {error && <Error text={invalidQueryText} />}
      <div className="flex flex-row align-middle gap-4">
        <p className="text-sm text-neutral-600 self-center">Искать в:</p>
        <TagSelect
          options={["Google Play", "RuStore"]}
          selected={selected}
          onChange={(s) => setSelected(s)}
        />
      </div>
    </section>
  );
}
