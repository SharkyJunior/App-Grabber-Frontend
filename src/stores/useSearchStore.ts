import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const STORES = ["Google Play", "RuStore"] as const;
export type Store = (typeof STORES)[number];

interface SearchState {
  query: string;
  queryHistory: string[];
  selectedStores: Store[];
  setQuery: (q: string) => void;
  toggleStore: (store: Store) => void;
  appendToHistory: (q: string) => void;
  reset: () => void;
}

const HISTORY_LIMIT = 10;

const initialState = {
  query: "",
  queryHistory: [] as string[],
  selectedStores: ["Google Play"] as Store[],
};

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

          const withoutDup = state.queryHistory.filter((h) => h !== trimmed);
          return {
            queryHistory: [trimmed, ...withoutDup].slice(0, HISTORY_LIMIT),
          };
        }),

      reset: () => set(initialState),
    }),
    {
      name: "search-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        query: state.query,
        queryHistory: state.queryHistory,
        selectedStores: state.selectedStores,
      }),
    },
  ),
);
