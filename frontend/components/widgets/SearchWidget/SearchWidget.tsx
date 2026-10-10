"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TagSelect } from "@/components/ui/TagSelect";

export type SearchWidgetProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
};

export default function SearchWidget({
  placeholder = "com.example.app",
  onSearch,
  className,
}: SearchWidgetProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(["Google Play", "RuStore"]);
  const [selected, setSelected] = useState(["Google Play", "RuStore"]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      console.log(query);
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
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Ищем..." : "Поиск"}
        </Button>
      </form>
      <div className="flex flex-row align-middle gap-4">
        <p className="text-sm text-neutral-600 self-center">Искать в:</p>
        <TagSelect
          options={options}
          selected={selected}
          onChange={(s) => setSelected(s)}
        />
      </div>
    </section>
  );
}
