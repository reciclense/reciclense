const tabelaEstado = require('../migrations/estado');
const tabelaCidade = require('../migrations/cidade');

async function recuperarCidades(req, res) {

    await tabelaEstado.findOne({

        attributes: ['cd_estado'],

        where: {
            sigla_uf: req.params.uf
        }

    }).then(async function (estado) {

        await tabelaCidade.findAll({

            attributes: ['nm_cidade'],

            where: {
                cd_estado: estado.cd_estado
            }

        }).then(function (cidade) {
            return res.status(200).json({
                success: true,
                cidades: cidade
            })
        })

    }).catch(function (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    });

}

module.exports = recuperarCidades;