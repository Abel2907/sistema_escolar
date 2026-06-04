const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma'); 

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

        const token = jwt.sign(
            { usuario_id: usuario.id, perfil: usuario.perfil }, 
            chave_secreta, 
            { expiresIn: '1h' }
        );

        res.json({ mensagem: 'Login bem-sucedido', token: `Bearer ${token}` });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao fazer login' });
    }
});

app.listen(3001, () => console.log('Servidor de Login ativo na porta 3001'));