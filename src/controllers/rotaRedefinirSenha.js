/*
* LEGENDA - CODE_ERROR:
*   1 - Usuário não encontrado  
*   2 - Token Expirado  
*   3 - Não conseguiu atualizar a senha 
*/

//Importações
const bcrypt = require('bcrypt');
const JWT_CONFIG = require('../config/jwtSecret');
const jwt = require('jsonwebtoken');
const tabelaUsuario = require('../migrations/usuario');

async function redefinirSenha(req, res) {

    let dados = req.body

    //Verificando se o usuario existe
    await tabelaUsuario.findOne({
        where: {
            cd_usuario: dados.id
        }

    }).then(async function (usuario) {

        const secret = JWT_CONFIG.acessoToken + usuario.senha;

        try {

            //Verificando se o token é valido
            jwt.verify(dados.token, secret);

            //Atualizando senha do usuário
            await tabelaUsuario.update({
                senha: await bcrypt.hash(dados.senha, 8)
            },
                {
                    where: {
                        cd_usuario: dados.id
                    }

                }).then(function () {
                    return res.status(400).json({
                        success: true
                    })
                }).catch(function (error) {
                    return res.status(400).json({
                        success: false,
                        code_error: 3,
                        message: error.message
                    })
                });

        } catch (error) {
            return res.status(400).json({
                success: false,
                code_error: 2,
                message: error.message
            })
        }

    }).catch(function (error) {
        return res.status(400).json({
            success: false,
            code_error: 1,
            message: error.message
        })
    });

}

module.exports = redefinirSenha;