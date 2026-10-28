import { cn } from "@/lib/utils";
import type { App } from "@/lib/api/apps";

const MAX_RATING = 5;

export function StoreDataTable({
  data,
  className,
}: {
  data: App;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card p-8",
        className,
      )}
    >
      <h2 className="mb-6 border-b border-border-subtle pb-4 text-2xl font-bold text-foreground">
        Данные из магазина
      </h2>

      <dl className="divide-y divide-border-subtle">
        <Row label="Название">{data.name}</Row>
        <Row label="Разработчик">{data.developer}</Row>
        <Row label="Категория">{data.category}</Row>
        <Row label="Возраст">{data.age_rating}</Row>
        <Row label="Оценка">
          <span className="inline-flex items-center gap-2">
            <StarIcon className="h-4 w-4 text-rating" />
            {data.rating.toString().replace(".", ",")} из {MAX_RATING}
          </span>
        </Row>
        <Row label="Package name">
          <span className="font-mono">{data.package_name}</span>
        </Row>
        <Row label="Ссылка">
          <a
            href={data.store_url}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-accent hover:underline"
          >
            {data.store_url}
          </a>
        </Row>
        <Row label="Иконка">
          <span className="break-all font-mono text-sm text-muted-text">
            {data.icon_url}
          </span>
        </Row>
      </dl>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 py-4">
      <dt className="text-base text-muted-text">{label}</dt>
      <dd className="col-span-2 text-base text-foreground">{children}</dd>
    </div>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}
