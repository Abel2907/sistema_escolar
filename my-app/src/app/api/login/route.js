import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const chave_secreta = 'chavoso_secret';

export async function POST(request) {
    try {
        const { email, senha } = await request.json();

        const usuario = await prisma.usuario.findUnique({ where: { email } });
        if (!usuario) {
            return NextResponse.json({ erro: 'Credenciais inválidas' }, { status: 401 });
        }

        const senha_valida = await bcrypt.compare(senha, usuario.senha);
        if (!senha_valida) {
            return NextResponse.json({ erro: 'Credenciais inválidas' }, { status: 401 });
        }

        await prisma.logAcesso.create({
            data: {
                idUsuario: usuario.id,
                ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
                device: request.headers.get('user-agent') || 'Desconhecido'
            }
        });

        const token = jwt.sign(
            { usuario_id: usuario.id, perfil: usuario.perfil }, 
            chave_secreta, 
            { expiresIn: '1h' }
        );

        return NextResponse.json({ 
            mensagem: 'Login bem-sucedido', 
            token: `Bearer ${token}`, 
            perfil: usuario.perfil 
        });
    } catch {
        return NextResponse.json({ erro: 'Erro ao fazer login' }, { status: 500 });
    }
}

export async function DELETE() {
    return NextResponse.json({ 
        sucesso: true,
        mensagem: 'Logout bem-sucedido' 
    });
}