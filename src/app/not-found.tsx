import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404 - Страница не найдена</h1>
      <p className="text-muted-text mb-6">
        Не получилось найти ресурс, который Вы искали :(
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent-hover transition"
      >
        Вернуться на главную
      </Link>
    </main>
  );
}
