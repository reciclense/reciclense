/*Configurações*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const acessoToken = "D587SCF4712TESC930WYZS4G52UMLOP51ZA56611A";

/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');

/*Função para salvar dados do Login com o Google*/
async function cadastrarUsuarioGoogle(req, res) {

    let dados = req.body;

    // Verificando se email ja existe na tabela de Usuários
    await tabelaUsuario.findOne({

        attributes: ['cd_usuario', 'email', 'senha', 'tp_perfil'],
        where: {
            email: dados.email
        }
        
    }).then(async function (usuario) {

        if (await bcrypt.compare(dados.senha, usuario.senha)) {

            let token = jwt.sign({ id: usuario.cd_usuario }, acessoToken, {
                expiresIn: 1800 //30min
            });

            return res.status(200).json({
                success: true,
                existeUsuario: true,
                id_usuario: usuario.cd_usuario,
                tp_perfil: usuario.tp_perfil,
                token
            });

        } else {
            return res.status(400).json({
                success: false
            });
        }
    }).catch(async function () {

        tabelaUsuario.create({
            email: dados.email,
            senha: await bcrypt.hash(dados.senha, 8),
            nm_usuario: dados.nome,
            sobrenome_usuario: dados.sobrenome,
            tp_perfil: dados.perfil

        }).then(async function () {

            await tabelaUsuario.findOne({
                attributes: ['cd_usuario', 'email', 'senha', 'nm_usuario', 'tp_perfil'],
                where: {
                    email: dados.email
                }
            }).then(async function (novoUsuario) {

                if (await bcrypt.compare(dados.senha, novoUsuario.senha)) {

                    let token = jwt.sign({ id: novoUsuario.cd_usuario }, acessoToken, {
                        expiresIn: 1800 //30min
                    });

                    return res.status(200).json({
                        success: true,
                        id_usuario: novoUsuario.cd_usuario,
                        existeUsuario: false,
                        token
                    });

                } else {
                    return res.status(400).json({
                        success: false
                    });
                }
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
        });
    });
}

module.exports = cadastrarUsuarioGoogle;