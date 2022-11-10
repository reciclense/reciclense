/*Configurações*/
const express = require('express');
const router = express.Router();

/*Importação das tabelas*/
const tabelaUsuario = require('../models/usuario');
const tabelaColeta = require('../models/coleta');
const tabelaEndereco = require('../models/endereco');
const tabelaCidade = require('../models/cidade');
const tabelaEstado = require('../models/estado');


/*Rota para Listar Usuários*/
router.get('/listar-perfil/:id', async function (req, res) {

    const usuario = await tabelaUsuario.findOne({
        attributes: ['email', 'nm_usuario', 'sobrenome_usuario', 'documento_principal'],

        include: [{
            model: tabelaEndereco, 
            attributes: ['nm_logradouro', 'cep', 'numero', 'nm_complemento'],

            include: [{
                model: tabelaCidade, 
                attributes: ['nm_cidade'],

                include: [{
                    model: tabelaEstado, 
                    attributes: ['nm_estado']
                }]
            }]
        }],
        where: {
            cd_usuario: req.params.id
        }
    }).then(function (usuario) {
        return res.status(200).json({
            success: true,
            usuario: usuario
        });
    }).catch(function (erro) {
        return res.status(400).json({
            success: false,
            messagem: erro.message
        });
    });

});

module.exports = router;