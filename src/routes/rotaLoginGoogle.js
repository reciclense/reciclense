/*Configurações*/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

/*Importação das tabelas*/
const tabelaUsuario = require('../models/usuario');

/*Rota para salvar dados do Login com o Google*/
router.post('/usuario-google', async function (req, res) {

    let dados = req.body;

    // Verificando se email ja existe na tabela de Usuários
    const buscarEmail = await tabelaUsuario.findOne({
        attributes: ['email'],
        where: {
            email: dados.email
        }
    });

    if (buscarEmail != null) {

        return res.status(400).json({
            success: false
        });

    } else {

        const senhaCripto = await bcrypt.hash(dados.senha, 8);

        tabelaUsuario.create({

            email: dados.email,
            senha: senhaCripto,
            nm_usuario: dados.nome,
            sobrenome_usuario: dados.sobrenome,
            tp_perfil: dados.perfil

        }).then(function () {

            return res.status(200).json({
                success: true,
                tp_perfil: dados.perfil
            });

        }).catch(function (error) {

            return res.status(400).json({
                success: false
            });

        });
    }
});

module.exports = router;