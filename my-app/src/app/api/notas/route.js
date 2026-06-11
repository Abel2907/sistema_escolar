import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    try {
        const { idNota } = params;
        const { novaNota } = await request.json();

        const materiaDoProfessor = "Matematica"; 
        const materiaDaNota = "Portugues";      

        if (materiaDoProfessor !== materiaDaNota) {
            return NextResponse.json(
                { erro: `Acesso negado. Você leciona ${materiaDoProfessor} e não pode alterar notas de ${materiaDaNota}.` },
                { status: 403 }
            );
        }

        return NextResponse.json({ 
            sucesso: true,
            mensagem: `Sucesso! A nota com ID ${idNota} foi alterada para ${novaNota}.` 
        });

    } catch (error) {
        return NextResponse.json(
            { erro: 'Erro interno ao atualizar a nota' },
            { status: 500 }
        );
    }
}