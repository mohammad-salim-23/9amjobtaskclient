export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 font-[family-name:var(--font-geist-sans)] p-8 sm:p-20">
      <a
        href="/dashboard"
        className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
      >
        Dashboard
      </a>

      <div className="flex gap-4">
        <a
          href="/login"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Sign In
        </a>
        <a
          href="/register"
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}
