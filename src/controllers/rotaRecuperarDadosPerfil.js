/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');
const tabelaColeta = require('../migrations/coleta');
const tabelaEndereco = require('../migrations/endereco');
const tabelaCidade = require('../migrations/cidade');
const tabelaEstado = require('../migrations/estado');
const tabelaCooperativa = require('../migrations/cooperativa');

/*Função para recuperar dados do perfil do usuario na tela meu perfil*/
async function recuperarDadosPerfil(req, res) {

    if (req.params.perfil == 'fisica') {

        const usuario = await tabelaUsuario.findOne({

            attributes: ['email', 'nm_usuario', 'sobrenome_usuario', 'documento_principal', 'tp_perfil'],

            include: [{

                model: tabelaEndereco,
                attributes: ['nm_logradouro', 'cep', 'numero', 'nm_complemento'],

                include: [{
                    model: tabelaCidade,
                    attributes: ['nm_cidade'],

                    include: [{
                        model: tabelaEstado,
                        attributes: ['nm_estado']
                    }]
                }]
            }],
            where: {
                cd_usuario: req.params.id
            }
        }).then(function (usuario) {

            return res.status(200).json({
                success: true,
                usuario: usuario
            });
        }).catch(function (erro) {
            return res.status(400).json({
                success: false,
                messagem: erro.message
            });
        });

    } else {

        const usuario = await tabelaUsuario.findOne({

            attributes: ['email', 'nm_usuario', 'sobrenome_usuario', 'documento_principal'],

            include: [{

                model: tabelaCooperativa,
                attributes: ['razao_social', 'cnpj'],

                include: [{

                    model: tabelaEndereco,
                    attributes: ['nm_logradouro', 'cep', 'numero', 'nm_complemento'],

                    include: [{
                        model: tabelaCidade,
                        attributes: ['nm_cidade'],

                        include: [{
                            model: tabelaEstado,
                            attributes: ['nm_estado']
                        }]
                    }]
                }]
            }],
            where: {
                cd_usuario: req.params.id
            }
        }).then(function (usuario) {

            return res.status(200).json({
                success: true,
                usuario: usuario
            });
        }).catch(function (erro) {
            return res.status(400).json({
                success: false,
                messagem: erro.message
            });
        });
    }
}

module.exports = recuperarDadosPerfil;