export type Step = {
  title: string; // bold part — "Введите запрос."
  text: string; // regular part — "Package name, ссылку на магазин или название."
};

export type HowItWorksProps = {
  title?: string;
  steps: Step[];
  className?: string;
};
