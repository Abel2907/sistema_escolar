"use client";

// esses são dados de login TEMPORÁRIOS para testar o dashboard, 
// serão apagados nas versões finais

import { useState } from "react";
import { useRouter } from "next/navigation";
import CadastroInput from "../../components/input/FormInput";
import Link from "next/link";

export default function Login() {
const router = useRouter();


const [perfil, setPerfil] = useState("ALUNO");
const [abrirPerfil, setAbrirPerfil] = useState(false);

const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");

const usuariosMock = [
    {
        email: "aluno@escola.com",
        senha: "123",
        perfil: "ALUNO",
        nome: "João Silva",
    },
    {
        email: "professor@escola.com",
        senha: "123",
        perfil: "PROFESSOR",
        nome: "Maria Professora",
    },
    {
        email: "admin@escola.com",
        senha: "123",
        perfil: "ADMIN",
        nome: "Carlos Admin",
    },
];

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const usuario = usuariosMock.find(
        (u) =>
            u.email === email &&
            u.senha === senha &&
            u.perfil === perfil
    );

    if (!usuario) {
        alert("Email, senha ou perfil inválidos.");
        return;
    }

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

    if (usuario.perfil === "ALUNO") {
        router.push("/dashboards/aluno");
    }

    if (usuario.perfil === "PROFESSOR") {
        router.push("/dashboards/professor");
    }

    if (usuario.perfil === "ADMIN") {
        router.push("/dashboards/admin");
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

            <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit}
            >
                <div className="relative mx-6">
                    <button
                        type="button"
                        onClick={() =>
                            setAbrirPerfil(!abrirPerfil)
                        }
                        className="w-full h-10 border-b-2 border-gray-300 flex items-center justify-between text-gray-700"
                    >
                        <span>
                            Perfil:{" "}
                            {perfil === "ALUNO"
                                ? "Aluno"
                                : perfil === "PROFESSOR"
                                ? "Professor"
                                : "Administrador"}
                        </span>

                        <i
                            className={`bi ${
                                abrirPerfil
                                    ? "bi-chevron-up"
                                    : "bi-chevron-down"
                            }`}
                        ></i>
                    </button>

                    {abrirPerfil && (
                        <div className="absolute z-10 w-full bg-white border rounded-lg shadow-md mt-2 overflow-hidden">
                            <button
                                type="button"
                                className="w-full text-left px-4 py-3 hover:bg-gray-100"
                                onClick={() => {
                                    setPerfil("ALUNO");
                                    setAbrirPerfil(false);
                                }}
                            >
                                Aluno
                            </button>

                            <button
                                type="button"
                                className="w-full text-left px-4 py-3 hover:bg-gray-100"
                                onClick={() => {
                                    setPerfil("PROFESSOR");
                                    setAbrirPerfil(false);
                                }}
                            >
                                Professor
                            </button>

                            <button
                                type="button"
                                className="w-full text-left px-4 py-3 hover:bg-gray-100"
                                onClick={() => {
                                    setPerfil("ADMIN");
                                    setAbrirPerfil(false);
                                }}
                            >
                                Administrador
                            </button>
                        </div>
                    )}
                </div>

                <CadastroInput
                    nameLabel="Email"
                    id="id-email"
                    type="email"
                    placeholder="exemplo@gmail.com"
                    value={email}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)
                    }
                />

                <CadastroInput
                    nameLabel="Senha"
                    id="id-senha"
                    type="password"
                    placeholder="********"
                    value={senha}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    setSenha(e.target.value)
                    }
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
);

}
