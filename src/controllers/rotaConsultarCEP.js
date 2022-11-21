let Correios = require('node-cep-correios');
let correios = new Correios();

const tabelaEstado = require('../migrations/estado');

async function consultarCEP(req, res) {

    correios.consultaCEP({

        cep: req.params.cep

    }).then(async function (endereco) {

        console.log('ENDERECO - CEP: ' + endereco.cep);
        console.log('ENDERECO - TIPO: ' + endereco.address_type);
        console.log('ENDERECO - RUA: ' + endereco.address_name);
        console.log('ENDERECO - RUA COMPLETA: ' + endereco.address);
        console.log('ENDERECO - ESTADO: ' + endereco.state);
        console.log('ENDERECO - BAIRRO: ' + endereco.district);

        if (endereco.state == undefined) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        } else {

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
        }
    }).catch(function (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    })

}

module.exports = consultarCEP;