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
router.get('/listar-coletas', async function (req, res) {

    const coletas = await tabelaColeta.findAll({
        attributes: ['data', 'horario', 'observacao'],
        include: [
            {
                model: tabelaUsuario,
                attributes: ['nm_usuario'],
                include: {
                    model: tabelaEndereco,
                    attributes: ['cep', 'nm_bairro', 'nm_logradouro', 'numero', 'nm_complemento'],
                    include: {
                        model: tabelaCidade,
                        attributes: ['nm_cidade'],
                        include: {
                            model: tabelaEstado,
                            attributes: ['sigla_uf']
                        }
                    }
                }
            }
        ]

    }).then(function (coletas) {
        return res.status(200).json({
            success: true,
            dados: coletas
        });
    }).catch(function (erro) {
        return res.status(400).json({
            success: false,
            messagem: erro.message
        });
    });
});

module.exports = router;