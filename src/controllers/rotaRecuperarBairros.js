/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');
const tabelaColeta = require('../migrations/coleta');
const tabelaEndereco = require('../migrations/endereco');
const tabelaMaterial = require('../migrations/material');

/*Função para listar coletas*/
async function recuperarBairros(req, res) {

    await tabelaColeta.findAll({

        include: [

            {
                model: tabelaMaterial,

            },

            {
                model: tabelaUsuario,

                include: {
                    model: tabelaEndereco,
                    attributes: ['nm_bairro'],
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

}

module.exports = recuperarBairros;