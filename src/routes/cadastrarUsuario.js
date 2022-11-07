/*Configurações*/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

/*Importação das tabelas*/
const tabelaUsuario = require('../models/usuario');

/*Rota para Cadastrar Usuário*/
router.post('/cad-usuario', async function (req, res) {

    let dados = req.body;

    // Verificando se email ja existe na tabela de Usuários
    const buscarEmail = await tabelaUsuario.findOne({
        attributes: ['email'],
        where: {
            email: dados.email
        }
    });


    // Se nenhum email igual for encontrado, irá permitir fazer o login
    if (buscarEmail != null) {

        return res.status(400).json({
            success: false
        });

    } else {

        const senhaCripto = await bcrypt.hash(dados.senha, 8);

        tabelaUsuario.create({
            email: dados.email,
            senha: senhaCripto,
            tp_perfil: dados.tp_perfil
        }).then(function () {
            return res.status(200).json({
                success: true,
                tp_perfil: dados.tp_perfil
            });
        }).catch(function (erro) {
            return res.status(400).json({
                success: false
            });
        });
    }
});

module.exports = router;