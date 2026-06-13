import Link from "next/link";

export default function Side_Bar({ aberta, fechar }) {
  return (
    <>
      {aberta && (
        <>
          <div
            onClick={fechar}
            className="fixed inset-0 bg-black/40"
          />

          <aside className="fixed left-0 top-0 h-screen w-72 bg-blue-950 text-blue-200 z-50">
            <nav className="p-4 mt-20">
              <ul className="space-y-4">
                <li>
                  <Link href="/turma">Turma</Link>
                </li>
                <li>
                  <Link href="/notas">Notas</Link>
                </li>
                <li>
                  <Link href="/professores">Professores</Link>
                </li>
                <li>
                  <Link href="/disciplinas">Disciplinas</Link>
                </li>
              </ul>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}