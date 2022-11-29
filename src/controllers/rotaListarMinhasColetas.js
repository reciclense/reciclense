/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');
const tabelaColeta = require('../migrations/coleta');
const tabelaEndereco = require('../migrations/endereco');
const tabelaCidade = require('../migrations/cidade');
const tabelaEstado = require('../migrations/estado');
const tabelaMaterial = require('../migrations/material');

/*Função para listar minhas coletas*/
async function listarMinhasColetas(req, res) {

    await tabelaColeta.findAll({
        attributes: ['cd_coleta', 'data', 'horario', 'observacao', 'cd_material'],
        include: [
            {
                model: tabelaMaterial,
                attributes: ['nm_material'],
            }
        ],
        where: {
            cd_usuario: req.params.id
        }
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

module.exports = listarMinhasColetas;