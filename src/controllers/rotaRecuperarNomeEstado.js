const tabelaEstado = require('../migrations/estado');

async function recuperarNomeEstado(req, res) {

    await tabelaEstado.findOne({

        attributes: ['nm_estado'],

        where: {
            sigla_uf: req.params.uf
        }
        
    }).then(async function (estado) {

        return res.status(200).json({
            success: true,
            nome_estado: estado.nm_estado
        })

    }).catch(function (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    });

}

module.exports = recuperarNomeEstado;