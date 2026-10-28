import { cn } from "@/lib/utils";
import type { HowItWorksProps } from "./types";

export function HowItWorks({
  title = "Как это работает",
  steps,
  className,
}: HowItWorksProps) {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className={cn("flex flex-col gap-8", className)}
    >
      <h2
        id="how-it-works-heading"
        className="text-2xl font-bold tracking-tight text-foreground"
      >
        {title}
      </h2>

      <ol className="flex flex-col gap-8">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-6">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-md font-bold text-background"
            >
              {i + 1}
            </span>

            <p className="pt-1 text-lg leading-snug text-muted-text">
              <strong className="font-bold text-foreground">{step.title}</strong>{" "}
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
