// src/stores/useSearchStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AppSearchResult } from "@/lib/api/apps";

export const STORES = ["Google Play", "RuStore"] as const;
export type StoreName = (typeof STORES)[number];

interface SearchState {
  // persisted
  query: string;
  queryHistory: string[];
  selectedStores: StoreName[];

  // ephemeral
  searchResult: AppSearchResult | null;
  isSearching: boolean;
  searchError: string | null;

  // actions
  setQuery: (q: string) => void;
  toggleStore: (store: StoreName) => void;
  appendToHistory: (q: string) => void;
  reset: () => void;

  runSearch: (q: string) => Promise<void>;
  clearResults: () => void;
}

const initialState = {
  query: "",
  queryHistory: [] as string[],
  selectedStores: ["Google Play"] as StoreName[],
  searchResult: null as AppSearchResult | null,
  isSearching: false,
  searchError: null as string | null,
};

// Ignores stale responses when the user submits two searches in quick succession.
let searchGeneration = 0;

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      ...initialState,

      setQuery: (query) => set({ query }),

      toggleStore: (store) =>
        set((state) => ({
          selectedStores: state.selectedStores.includes(store)
            ? state.selectedStores.filter((s) => s !== store)
            : [...state.selectedStores, store],
        })),

      appendToHistory: (q) =>
        set((state) => {
          const trimmed = q.trim();
          if (!trimmed) return state;
          const deduped = state.queryHistory.filter((h) => h !== trimmed);
          return { queryHistory: [trimmed, ...deduped].slice(0, 13) };
        }),

      clearResults: () =>
        set({ searchResult: null, searchError: null, isSearching: false }),

      runSearch: async (q) => {
        const trimmed = q.trim();
        if (!trimmed) return;

        const gen = ++searchGeneration;
        set({ isSearching: true, searchError: null, searchResult: null });

        try {
          const params = new URLSearchParams({ q: trimmed });
          // Add `stores` here when the backend supports filtering:
          // params.set("stores", get().selectedStores.join(","));

          const res = await fetch(`/api/search?${params}`);

          if (gen !== searchGeneration) return;

          if (!res.ok) {
            set({
              isSearching: false,
              searchError: "Поиск не удался. Попробуйте повторить позднее.",
            });
            return;
          }

          const data = (await res.json()) as AppSearchResult;

          if (gen !== searchGeneration) return;

          if (data.results.length === 0) {
            set({ isSearching: false, searchError: "Ничего не найдено" });
            return;
          }

          set({ isSearching: false, searchResult: data });
        } catch {
          if (gen !== searchGeneration) return;
          set({ isSearching: false, searchError: "Ошибка сети" });
        }
      },

      reset: () => set(initialState),
    }),
    {
      name: "search-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        query: s.query,
        queryHistory: s.queryHistory,
        selectedStores: s.selectedStores,
      }),
    },
  ),
);
