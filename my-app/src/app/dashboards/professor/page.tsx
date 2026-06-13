"use client";

import { useState, ReactNode } from "react";
import Header from "./components_professor/professorHEADER"
import Side_Bar from "./components_professor/sidebar";
import NotasAluno from "./components_professor/notas_alunos"
export default function Layout({ children }: { children: ReactNode }) {
  const [aberta, setAberta] = useState(false);

  return (
    <>
      <Header onToggleSidebar={() => setAberta(!aberta)} />

      <Side_Bar aberta={aberta} fechar={() => setAberta(false)} />
      <NotasAluno/>
      <main className="pt-20">{children}</main>
    </>
  );
}