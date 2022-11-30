/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');
const tabelaEndereco = require('../migrations/endereco');
const tabelaCidade = require('../migrations/cidade');
const tabelaEstado = require('../migrations/estado');
const tabelaCooperativa = require('../migrations/cooperativa');

/*Função para recuperar dados do perfil do usuario na tela meu perfil*/
async function recuperarDadosPerfil(req, res) {

    if (req.params.perfil == 'fisica') {

        await tabelaUsuario.findOne({

            attributes: ['email', 'nm_usuario', 'sobrenome_usuario', 'dt_nascimento', 'documento_principal', 'tp_perfil', 'cd_endereco', 'cd_cooperativa'],

            include: [{

                model: tabelaEndereco,
                attributes: ['nm_logradouro', 'cep', 'nm_bairro', 'numero', 'nm_complemento'],

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
                cd_endereco: usuario.cd_endereco,
                cd_cooperativa: usuario.cd_cooperativa,
                usuario: usuario
            });
        }).catch(function (erro) {
            return res.status(400).json({
                success: false,
                messagem: erro.message
            });
        });

    } else {

        await tabelaUsuario.findOne({

            attributes: ['email', 'nm_usuario', 'sobrenome_usuario', 'dt_nascimento', 'documento_principal', 'cd_endereco', 'cd_cooperativa'],

            include: [{

                model: tabelaCooperativa,
                attributes: ['razao_social', 'cnpj'],

                include: [{

                    model: tabelaEndereco,
                    attributes: ['nm_logradouro', 'cep', 'nm_bairro', 'numero', 'nm_complemento'],

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
                cd_endereco: usuario.cd_endereco,
                cd_cooperativa: usuario.cd_cooperativa,
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