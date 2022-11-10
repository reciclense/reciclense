/*Configurações*/
const express = require('express');
const router = express.Router();

/*Importação de middlewars*/
const { eAdmin } = require('/FICR/reciclense/middlewares/auth');

/*Importação das tabelas*/
const tabelaUsuario = require('../models/usuario');

/*Rota para validar se usuário está logado*/
router.get('/btn-dinamico', eAdmin, async (req, res) => {

    const usuario = await tabelaUsuario.findOne({
        attributes: ['tp_perfil'],
        where: {
            cd_usuario: req.userId
        }
    });

    if (usuario == null) {

        return res.status(400).json({
            success: false
        });

    } else {
        return res.status(200).json({
            success: true,
            tp_perfil: usuario.tp_perfil
        });
    }
});

module.exports = router;