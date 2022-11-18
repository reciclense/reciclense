let Correios = require('node-cep-correios');
let correios = new Correios();

const tabelaEstado = require('../migrations/estado');

async function consultarCEP(req, res) {

    correios.consultaCEP({

        cep: req.params.cep

    }).then(async function (endereco) {

        console.log('ESTADO: ' + endereco.state);

        await tabelaEstado.findOne({

            attributes: ['nm_estado'],

            where: {
                sigla_uf: endereco.state
            }

        }).then(function (estado) {

            return res.status(200).json({
                success: true,
                endereco: endereco,
                estado: estado.nm_estado
            });

        }).catch(function (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        });
    }).catch(function (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    })

}

module.exports = consultarCEP;