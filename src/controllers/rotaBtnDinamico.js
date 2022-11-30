/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');

/*Função para verificar se o usuário esta logado*/
async function btnDinamico(req, res) {

    await tabelaUsuario.findOne({
        attributes: ['tp_perfil'],
        where: {
            cd_usuario: req.userId
        }
    }).then(function (usuario) {
        return res.status(200).json({
            success: true,
            tp_perfil: usuario.tp_perfil
        });
    }).catch(function (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });

    });
}

module.exports = btnDinamico;