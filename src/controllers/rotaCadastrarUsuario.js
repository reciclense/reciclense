/*Configurações*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const acessoToken = "D587SCF4712TESC930WYZS4G52UMLOP51ZA56611A";

/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');

/*Função para cadastrar o usuario*/
async function cadastrarUsuario(req, res) {

    let dados = req.body;

    // Verificando se email ja existe na tabela de Usuários
    const usuario = await tabelaUsuario.findOne({
        attributes: ['email'],
        where: {
            email: dados.email
        }
    });

    if (usuario != null) {

        return res.status(400).json({
            success: false,
            message: "Usuário ja cadastrado!"
        });

    } else {

        await tabelaUsuario.create({

            email: dados.email,
            senha: await bcrypt.hash(dados.senha, 8),
            tp_perfil: dados.tp_perfil

        }).then(async function () {

            await tabelaUsuario.findOne({
                attributes: ['cd_usuario', 'email', 'senha', 'nm_usuario', 'tp_perfil'],
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
                        id_usuario: usuario.cd_usuario,
                        tp_perfil: usuario.tp_perfil,
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
        }).catch(async function (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        });
    }
}
module.exports = cadastrarUsuario;