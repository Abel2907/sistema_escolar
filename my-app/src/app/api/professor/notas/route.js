import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const chave_secreta = 'chavoso_secret';

export async function POST(request) {
    const header_autorizacao = request.headers.get('authorization');
    if (!header_autorizacao) {
        return NextResponse.json({ erro: 'Token não fornecido' }, { status: 401 });
    }

    const token = header_autorizacao.split(' ')[1];

    try {
        const dados_do_token = jwt.verify(token, chave_secreta);

        if (dados_do_token.perfil !== 'PROFESSOR' && dados_do_token.perfil !== 'ADMIN') {
            return NextResponse.json({ erro: 'Acesso proibido para o seu nível de usuário' }, { status: 403 });
        }

        return NextResponse.json({ mensagem: 'Acesso autorizado para lançar notas' });
    } catch {
        return NextResponse.json({ erro: 'Token inválido ou expirado' }, { status: 401 });
    }
}