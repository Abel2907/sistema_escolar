"use client";

import Link from 'next/link';


export const metadata = {
  title: "Sistema Escolar",
};

export default function Hero() {
return (
    <div>
            <Link href="../cadastro">
            <button>cadastrar</button>
            </Link>

            <Link href="../login">
            <button>login</button>
            </Link>
        </div>
);
}