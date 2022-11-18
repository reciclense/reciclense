const tabelaEstado = require('../migrations/estado');
const tabelaUsuario = require('../migrations/usuario');

async function recuperarEstados(req, res) {

    await tabelaUsuario.findOne({

        attributes: ['cd_endereco', 'cd_cooperativa'],

        where: {
            cd_usuario: req.params.id
        }

    }).then(async function (usuario) {

        await tabelaEstado.findAll({

            attributes: ['cd_estado', 'nm_estado', 'sigla_uf'],

        }).then(async function (estado) {

            if (usuario.cd_endereco == null && usuario.cd_cooperativa == null) {

                return res.status(200).json({
                    success: true,
                    estados: estado
                })

            } else {

                return res.status(200).json({
                    success: false,
                    estados: estado
                })
            }

        }).catch(function (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        });
    }).catch(function (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    });
}

module.exports = recuperarEstados;