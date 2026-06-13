import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const chave_secreta = 'chavoso_secret';
const chave_uni_professor = 'SENHA_UNIVERSAL_PROFESSOR_123';
const chave_uni_admin = 'SENHA_UNIVERSAL_ADMIN_999';

export async function POST(request) {
    try {
        const { email, senha, funcao_user, chave_mestra } = await request.json();

        if (!email || !senha) {
            return NextResponse.json({ erro: 'Email e senha são obrigatórios' }, { status: 400 });
        }

        const usuario_existente = await prisma.usuario.findUnique({ where: { email } });
        if (usuario_existente) {
            return NextResponse.json({ erro: 'Este email já está cadastrado' }, { status: 400 });
        }

        let funcao_definida = 'ALUNO';

        if (funcao_user === 'ADMIN') {
            if (chave_mestra !== chave_uni_admin) {
                return NextResponse.json({ erro: 'Chave mestra inválida para criar um Administrador' }, { status: 403 });
            }
            funcao_definida = 'ADMIN';
        } else if (funcao_user === 'PROFESSOR') {
            if (chave_mestra !== chave_uni_professor) {
                return NextResponse.json({ erro: 'Chave mestra inválida para criar um Professor' }, { status: 403 });
            }
            funcao_definida = 'PROFESSOR';
        }

        const senha_criptografada = await bcrypt.hash(senha, 10);

        const novo_usuario = await prisma.usuario.create({
            data: {
                email: email,
                senha: senha_criptografada,
                perfil: funcao_definida
            }
        });

        return NextResponse.json({ 
            mensagem: 'Usuário cadastrado com sucesso', 
            usuario: { id: novo_usuario.id, email: novo_usuario.email, perfil: novo_usuario.perfil } 
        }, { status: 201 });

    } catch {
        return NextResponse.json({ erro: 'Erro ao cadastrar usuário' }, { status: 500 });
    }
}