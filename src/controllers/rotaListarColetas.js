/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');
const tabelaColeta = require('../migrations/coleta');
const tabelaEndereco = require('../migrations/endereco');
const tabelaCidade = require('../migrations/cidade');
const tabelaEstado = require('../migrations/estado');
const tabelaMaterial = require('../migrations/material');

/*Função para listar coletas*/
async function listarColetas(req, res) {

    await tabelaColeta.findAll({
        attributes: ['data', 'horario', 'observacao'],
        include: [

            {
                model: tabelaMaterial,
                attributes: ['nm_material'],
            },

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
                            attributes: ['nm_estado']
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

}

module.exports = listarColetas;