import Link from "next/link"

export default function Header() {  
  return (
    <header className="bg-blue-950 flex justify-between h-20">
      <div className="text-blue-200 text-2xl p-8 pl-7">
        <h1 className="font-sans">Aluno-ON</h1>
      </div>

      <ul className="flex gap-8 mx-left p-10 pl-6 text-blue-200">
        <li>
          <Link href="/auth/cadastro" className="hover:text-cyan-200 hover:underline transition-all">
            Cadastro
          </Link>
        </li>
        <li>
          <Link href="/auth/login" className="hover:text-cyan-200 hover:underline transition-all">
            Login
          </Link>
        </li>
      </ul>
    </header>
  );
}

