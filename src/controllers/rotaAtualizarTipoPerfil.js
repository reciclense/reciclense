/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');

/*Função para verificar se o o gmail já esta cadastrado*/
async function atualizarTipoPerfil(req, res) {

    let dados = req.body;

    // Verificando se email ja existe na tabela de Usuários
    await tabelaUsuario.update({ tp_perfil: dados.perfil }, {

        where: {
            email: dados.email
        }

    }).then(function () {
        return res.status(200).json({
            success: true
        });
    }).catch(function (error) {
        return res.status(400).json({
            success: false,
            perfil:dados.perfil,
            message: error.message
        });
    });
}

module.exports = atualizarTipoPerfil;