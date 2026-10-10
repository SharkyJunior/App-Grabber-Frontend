export type StoreStatus = "found" | "searching" | "not-found";

export type StoreResult = {
  name: string;
  status: StoreStatus;
};

export type AppResult = {
  id: string;
  name: string; // "Учи.ру"
  company: string; // 'ООО "Учи.ру"'
  package: string; // "com.uchi.app"
  category: string; // "Образование"
  rating: number; // 4.2
  letter: string; // "У" (avatar)
  stores: StoreResult[];
};

export type ResultsWidgetProps = {
  results: AppResult[];
  className?: string;
  onOpen?: (app: AppResult) => void;
  onCompare?: (app: AppResult) => void;
};
