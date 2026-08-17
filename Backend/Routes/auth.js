const express = require("express");
const router = express.Router();

const fs = require("fs-extra");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const path = require("path");

const DB = path.join(__dirname, "../database/users.json");

// ROTA DE REGISTRO
router.post("/register", async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                message: "Preencha todos os campos."
            });
        }

        const users = await fs.readJson(DB).catch(() => []);

        const existe = users.find((u) => u.email === email);

        if (existe) {
            return res.status(400).json({
                message: "Email já cadastrado."
            });
        }
        const senhaHash = await bcrypt.hash(senha, 10);

        users.push({
            id: Date.now(),
            nome,
            email,
            senha: senhaHash
        });

        await fs.writeJson(DB, users, { spaces: 2 });

        return res.json({
            message: "Usuário criado com sucesso."
        });

    } catch (error) {
        return res.status(500).json({
            message: "Erro no servidor ao registrar."
        });
    }
});

// ROTA DE LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                message: "Preencha todos os campos."
            });
        }
        const users = await fs.readJson(DB).catch(() => []);

        const usuario = users.find((u) => u.email === email);

        if (!usuario) {
            return res.status(401).json({
                message: "Email não cadastrado."
            });
        }

        const ok = await bcrypt.compare(senha, usuario.senha);

        if (!ok) {
            return res.status(401).json({
                message: "senha inválida."
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome
            },
            "segredo123",
            {
                expiresIn: "8h"
            }
        );

        return res.json({
            message: "Login realizado com sucesso.",
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: "Erro no servidor ao realizar login."
        });
    }
});

module.exports = router;

