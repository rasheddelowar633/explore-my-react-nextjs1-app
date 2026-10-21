
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#111411] p-10 text-center">
        <h1 className="text-8xl font-bold text-[#C2F800]">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-400">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-[#C2F800] px-6 py-3 font-semibold text-black transition hover:bg-white"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
