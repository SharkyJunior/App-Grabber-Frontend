import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404 - Страница не найдена</h1>
      <p className="text-gray-500 mb-6">
        Не получилось найти ресурс, который Вы искали :(
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Вернуться на главную
      </Link>
    </main>
  );
}
