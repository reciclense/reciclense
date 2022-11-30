const tabelaUsuario = require("../migrations/usuario");

async function validarDadosPerfil(req, res) {

    await tabelaUsuario.findOne({
        attributes: ['cd_endereco', 'cd_cooperativa'],
        where: {
            cd_usuario: req.params.id
        }
    }).then(function (usuario) {

        if (usuario.cd_endereco != null|| usuario.cd_cooperativa != null) {
            return res.status(200).json({
                success: true,
                perfil: req.params.perfil
            })
        } else {
            return res.status(400).json({
                success: false,
                perfil: req.params.perfil,
                message: 'Necessário completar o perfil'
            })
        }
    }).catch(function (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    });
}

module.exports = validarDadosPerfil;