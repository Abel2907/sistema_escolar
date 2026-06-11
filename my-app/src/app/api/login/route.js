import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma';
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const chave_secreta = 'chavoso_secret';

app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await prisma.usuario.findUnique({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        const senha_valida = await bcrypt.compare(senha, usuario.senha);
        if (!senha_valida) {
            return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        await prisma.logAcesso.create({
            data: {
                idUsuario: usuario.id,
                ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1',
                device: req.headers['user-agent'] || 'Desconhecido'
            }
        });

        const token = jwt.sign(
            { usuario_id: usuario.id, nome: usuario.nome, perfil: usuario.perfil }, 
            chave_secreta, 
            { expiresIn: '1h' }
        );

        res.json({ mensagem: 'Login bem-sucedido', token: `Bearer ${token}` });
    } catch {
        res.status(500).json({ erro: 'Erro ao fazer login' });
    }
});

app.listen(3001, () => console.log('Servidor de Login ativo na porta 3001'));