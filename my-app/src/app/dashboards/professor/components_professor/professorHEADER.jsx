import Link from "next/link";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="fixed top-0 bg-blue-950 flex items-center justify-between h-20 w-full px-6">
      
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-4 text-blue-200 text-2xl"
        >
          ☰
        </button>

        <div className="text-blue-100 text-2xl">
          <h1 className="font-sans">Aluno-ON</h1>
        </div>
      </div>

      <div className="flex items-center">
        <Link
          href="/auth/app"
          className="text-blue-200 text-lg hover:text-cyan-200 hover:underline transition-all"
        >
          Log-out
        </Link>
      </div>

    </header>
  );
}