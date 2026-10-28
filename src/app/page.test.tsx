import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

// --- Mocks ---

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const setQueryMock = vi.fn();
const runSearchMock = vi.fn();
const clearHistoryMock = vi.fn();
let mockQueryHistory: string[] = [];

vi.mock("@/stores/useSearchStore", () => ({
  useSearchStore: () => ({
    queryHistory: mockQueryHistory,
    runSearch: runSearchMock,
    setQuery: setQueryMock,
    clearHistory: clearHistoryMock,
  }),
}));

vi.mock("@/components/widgets/SearchWidget/SearchWidget", () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid="search-widget" className={className}>
      SearchWidget
    </div>
  ),
}));

vi.mock("@/components/widgets/ResultsWidget", () => ({
  ResultsWidget: ({ className }: { className?: string }) => (
    <div data-testid="results-widget" className={className}>
      ResultsWidget
    </div>
  ),
}));

vi.mock("@/components/widgets/HowItWorks", () => ({
  HowItWorks: ({ steps }: { steps: { title: string; text: string }[] }) => (
    <div data-testid="how-it-works">
      {steps.map((s) => (
        <div key={s.title}>{s.title}</div>
      ))}
    </div>
  ),
}));

vi.mock("@/components/ui/PromptSelect", () => ({
  PromptSelect: ({
    prompts,
    onSelect,
    onClearHistory,
  }: {
    prompts: string[];
    onSelect: (p: string) => void;
    onClearHistory: () => void;
  }) => (
    <div data-testid="prompt-select">
      {prompts.map((p) => (
        <button key={p} onClick={() => onSelect(p)}>
          {p}
        </button>
      ))}
      <button onClick={onClearHistory}>Clear history</button>
    </div>
  ),
}));

const isValidPackageNameMock = vi.fn();
vi.mock("@/lib/utils", () => ({
  isValidPackageName: (v: string) => isValidPackageNameMock(v),
}));

// --- Tests ---

describe("Home page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockQueryHistory = [];
    isValidPackageNameMock.mockReturnValue(false);
  });

  describe("rendering", () => {
    it("renders the main heading and subtitle", () => {
      render(<Home />);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Найдите приложение сразу в нескольких магазинах",
      );

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Вставьте package name, ссылку на карточку или название.",
      );
    });

    it("renders the SearchWidget", () => {
      render(<Home />);
      expect(screen.getByTestId("search-widget")).toBeInTheDocument();
    });

    it("renders ResultsWidget and HowItWorks", () => {
      render(<Home />);
      expect(screen.getByTestId("results-widget")).toBeInTheDocument();
      expect(screen.getByTestId("how-it-works")).toBeInTheDocument();
    });

    it("does not render PromptSelect when queryHistory is empty", () => {
      render(<Home />);
      expect(screen.queryByTestId("prompt-select")).not.toBeInTheDocument();
    });
  });

  describe("history / PromptSelect", () => {
    beforeEach(() => {
      mockQueryHistory = ["react", "com.example.app"];
    });

    it("renders PromptSelect with history items when queryHistory is not empty", () => {
      render(<Home />);

      const promptSelect = screen.getByTestId("prompt-select");
      expect(promptSelect).toBeInTheDocument();
      expect(screen.getByText("react")).toBeInTheDocument();
      expect(screen.getByText("com.example.app")).toBeInTheDocument();
    });

    it("calls setQuery and runSearch for a non-package-name prompt", async () => {
      isValidPackageNameMock.mockReturnValue(false);
      const user = userEvent.setup();

      render(<Home />);
      await user.click(screen.getByText("react"));

      expect(setQueryMock).toHaveBeenCalledWith("react");
      expect(runSearchMock).toHaveBeenCalledWith("react");
      expect(pushMock).not.toHaveBeenCalled();
    });

    it("calls setQuery and navigates for a valid package name", async () => {
      isValidPackageNameMock.mockReturnValue(true);
      const user = userEvent.setup();

      render(<Home />);
      await user.click(screen.getByText("com.example.app"));

      expect(setQueryMock).toHaveBeenCalledWith("com.example.app");
      expect(pushMock).toHaveBeenCalledWith("/apps/com.example.app");
      expect(runSearchMock).not.toHaveBeenCalled();
    });

    it("calls clearHistory when the clear button is clicked", async () => {
      const user = userEvent.setup();

      render(<Home />);
      await user.click(screen.getByText("Clear history"));

      expect(clearHistoryMock).toHaveBeenCalledTimes(1);
    });
  });
});
