import Link from "next/link"

export default function Header() {  
  return (
    <header className="bg-blue-950 flex justify-between h-20">
      <div className="text-blue-100 text-2xl p-2 pl-7">
        <h1 className="font-sans p-2 mx-8">Aluno-ON</h1>
      </div>

      <ul className=" flex p-3">
        <li>
          <Link href="/auth/cadastro" className=" text-blue-200 p-2 text-lg flex mx-8 hover:text-cyan-200  no-underline hover:underline transition-all">
            Cadastro
          </Link>
        </li>
        <li>
          <Link href="/auth/login" className=" text-blue-200 p-2 text-lg flex mx-8 hover:text-cyan-200 no-underline hover:underline transition-all">
            Login
          </Link>
        </li>
      </ul>
    </header>
  );
}

