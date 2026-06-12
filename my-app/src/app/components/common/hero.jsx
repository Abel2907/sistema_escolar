import Link from "next/link"
export default function Hero() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <main className="flex flex-col items center gap-6 text-center">

                <h1 className="text-blue-500 font-semibold">Bem Vindo ao Aluno On</h1>

                <p className="text-blue-300">Acompanhe sua carreira Estudantil aqui!</p>
             <Link

                href="/auth/login/"
                className=" rounded-2xl bg-cyan-200 text-blue-400 font-semibold text-sm px-6 py-3 "
                    >  
                    Entrar
                </Link>
            </main>
        </div>
    );
}