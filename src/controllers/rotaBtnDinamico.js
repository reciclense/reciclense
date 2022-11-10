/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');

/*Função para verificar se o usuário esta logado*/
async function btnDinamico(req, res) {

    const usuario = await tabelaUsuario.findOne({
        attributes: ['tp_perfil'],
        where: {
            cd_usuario: req.userId
        }
    });

    if (usuario == null) {

        return res.status(400).json({
            success: false
        });

    } else {
        return res.status(200).json({
            success: true,
            tp_perfil: usuario.tp_perfil
        });
    }
}

module.exports = btnDinamico;