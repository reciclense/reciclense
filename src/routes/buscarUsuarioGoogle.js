/*Configurações*/
const express = require('express');
const router = express.Router();

/*Importação das tabelas*/
const tabelaUsuario = require('../models/usuario');

/*Rota para verificar se o usuario ja logou com o google antes*/
router.post('/busca-usuario-google', async function (req, res){

    let dados = req.body;

    // Verificando se email ja existe na tabela de Usuários
    const buscarEmail = await tabelaUsuario.findOne({
        attributes: ['email'],
        where: {
            email: dados.email
        }
    });

    if (buscarEmail == null) {

        return res.status(400).json({
            existeUsuario: false
        });

    } else {
        return res.status(200).json({
            existeUsuario: true
        });
    }
});

module.exports = router;