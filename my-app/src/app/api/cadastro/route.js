import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const chave_secreta = 'chavoso_secret';
const chave_uni_professor = 'SENHA_UNIVERSAL_PROFESSOR_123';
const chave_uni_admin = 'SENHA_UNIVERSAL_ADMIN_999';

function checar_perfil(perfis_permitidos) {
    return (req, res, next) => {
        const header_autorizacao = req.headers.authorization;
        if (!header_autorizacao) {
            return res.status(401).json({ erro: 'Token não fornecido' });
        }

        const token = header_autorizacao.split(' ')[1];

        try {
            const dados_do_token = jwt.verify(token, chave_secreta);
            req.usuario_logado = dados_do_token;

            if (!perfis_permitidos.includes(dados_do_token.perfil)) {
                return res.status(403).json({ erro: 'Acesso proibido para o seu nível de usuário' });
            }

            next();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return res.status(401).json({ erro: 'Token inválido ou expirado' });
        }
    };
}

app.post('/cadastro', async (req, res) => {
    try {
        const { email, senha, funcao_user, chave_mestra } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
        }

        const usuario_existente = await prisma.usuario.findUnique({ where: { email } });
        if (usuario_existente) {
            return res.status(400).json({ erro: 'Este email já está cadastrado' });
        }

        let funcao_definida = 'ALUNO';

        if (funcao_user === 'ADMIN') {
            if (chave_mestra !== chave_uni_admin) {
                return res.status(403).json({ erro: 'Chave mestra inválida para criar um Administrador' });
            }
            funcao_definida = 'ADMIN';
        } else if (funcao_user === 'PROFESSOR') {
            if (chave_mestra !== chave_uni_professor) {
                return res.status(403).json({ erro: 'Chave mestra inválida para criar um Professor' });
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

        res.status(201).json({ 
            mensagem: 'Usuário cadastrado com sucesso', 
            usuario: { id: novo_usuario.id, email: novo_usuario.email, perfil: novo_usuario.perfil } 
        });

    } catch {
        res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
    }
});

app.post('/professor/notas', checar_perfil(['PROFESSOR', 'ADMIN']), (req, res) => {
    res.json({ mensagem: 'Acesso autorizado para lançar notas' });
});

app.listen(3002, () =>
  console.log("Servidor de Cadastro ativo na porta 3002")
);
