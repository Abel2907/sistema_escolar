"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CadastroInput from "@/src/app/components/input/FormInput"
import Link from "next/link"

export default function Login() {
    const [perfil, setPerfil] = useState("ALUNO")
    const [abrirPerfil, setAbrirPerfil] = useState(false)
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")
    const router = useRouter()
    const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
) => {
    setEmail(e.target.value);
};

    const handleSenhaChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSenha(e.target.value);
    };

async function fazerLogin(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();
try {
    const resposta = await fetch(
         "http://localhost:3001/login", { 
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                email,
                senha,
         }),
         }
    )
    const dados = await resposta.json()
    if(!resposta.ok){
        alert(dados.erro || "Erro ao fazer login")
        return
    }

    localStorage.setItem("token", dados.token)

        if (dados.perfil === "ADMIN") {
            router.push("/dashboards/admin")
        } else if (dados.perfil === "PROFESSOR") {
            router.push("/dashboards/professor")
        } else {
            router.push("/dashboards/aluno")
        }
    } catch (erro) {
        console.error(erro)
         alert("Erro ao conectar ao servidor")
    }
}


    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <section className="w-full max-w-md">
                <div className="flex flex-col items-center mb-10">
                    <i className="bi bi-person-circle text-blue-400 text-8xl"></i>
                    <h2 className="text-3xl font-semibold mt-4">
                        Log-in
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Bem-vindo(a) de volta
                    </p>
                </div>
                <form onSubmit={fazerLogin}
                 className="flex flex-col gap-2">
                    <div className="relative mx-6">
                        <button
                            type="button"
                            onClick={() => setAbrirPerfil(!abrirPerfil)}
                            className="w-full h-10 border-b-2 border-gray-300 flex items-center justify-between text-gray-700"
                        >
                            <span>
                                Perfil: {
                                    perfil === "ALUNO"
                                        ? "Aluno"
                                        : perfil === "PROFESSOR"
                                        ? "Professor"
                                        : "Administrador"
                                }
                            </span>
                            <i className={`bi ${abrirPerfil ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                        </button>
                        {abrirPerfil && (
                            <div className="absolute z-10 w-full bg-white border rounded-lg shadow-md mt-2 overflow-hidden">
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                                    onClick={() => {
                                        setPerfil("ALUNO")
                                        setAbrirPerfil(false)
                                    }}
                                >
                                    Aluno
                                </button>
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                                    onClick={() => {
                                        setPerfil("PROFESSOR")
                                        setAbrirPerfil(false)
                                    }}
                                >
                                    Professor
                                </button>
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                                    onClick={() => {
                                        setPerfil("ADMIN")
                                        setAbrirPerfil(false)
                                    }}
                                >
                                    Administrador
                                </button>
                            </div>
                        )}
                    </div>
                    <input
                        type="hidden"
                        name="perfil"
                        value={perfil}
                    />
                    <CadastroInput
                        nameLabel="Email"
                        id="id-email"
                        type="email"
                        placeholder="exemplo@gmail.com"
                        value = {email}
                         onChange={handleEmailChange}
                    />
                    
                    <CadastroInput
                        nameLabel="Senha"
                        id="id.senha"
                        type="password"
                        placeholder="exeMpL095@"
                        value={senha}
                        onChange={handleSenhaChange}
                    />
                    <button
                       type="submit"
                        className="mt-6 h-12 rounded-2xl bg-gray-900 text-white hover:opacity-90 transition"
                    >
                        Entrar
                    </button>
                    <div className="text-center text-gray-600 mt-6">
                        Não possui uma conta?

                        <Link
                            href="/auth/cadastro"
                            className="ml-1 text-emerald-700 hover:underline"
                        >
                            Cadastre-se
                        </Link>
                    </div>
                </form>
            </section>
        </main>
    )
}