const tabelaEstado = require('../migrations/estado');
const tabelaUsuario = require('../migrations/usuario');

async function recuperarEstados(req, res) {

    await tabelaEstado.findAll({

        attributes: ['cd_estado', 'nm_estado', 'sigla_uf'],

    }).then(async function (estado) {

        return res.status(200).json({
            success: true,
            estados: estado
        })

    }).catch(function (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    });
}

module.exports = recuperarEstados;