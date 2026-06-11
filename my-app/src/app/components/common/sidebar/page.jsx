"use client";

import Link from "next/link";
import { useState } from "react";

export default function Side_Bar() {
    const [aberta, setAberta] = useState(true);

    return (
        <>
            <button
                onClick={() => setAberta(!aberta)}
                className="fixed top-4 left-4 p-2 bg-blue-900 text-white rounded"
            >
                ☰
            </button>

            {aberta && (
                <div className="flex">
                    <aside className="fixed left-0 top-0 h-screen w-72 bg-blue-950 text-blue-200">
                        <nav className="p-4">
                            <ul className="space-y-4">
                                <li>Turma</li>
                                <li>Notas</li>
                                <li>Professores</li>
                                <li>Disciplinas</li>
                            </ul>
                        </nav>
                    </aside>
                </div>
            )}
        </>
    );
}