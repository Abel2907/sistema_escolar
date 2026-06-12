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
                M
            </button>

            {aberta && (
                <div className="flex">
                    <aside className="fixed left-0 top-0 h-screen w-72 bg-blue-950 text-blue-200">
                        <nav className="p-5 justify-center"> 
                            <ul className="space-y-8 mx-auto">
                                <li className="w-14 cursor-pointer text-blue-200 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-400 transition duration-300 ">
                                    <link href="/app/dashboards/professor/components_professor/notas_alunos">
                                </li>
                                <li className="w-15 cursor-pointer text-blue-200 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-400 transition duration-300 ">
                            </ul>
                        </nav>
                    </aside>
                </div>
            )}
        </>
    );
}