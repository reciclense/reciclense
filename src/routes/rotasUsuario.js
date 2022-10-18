const express = require('express');
const router = express.Router();
const tabelaUsuario = require('/FICR/reciclense/src/models/usuario');

/*Login Google
router.post('/usuario-google', function(req, res) {

    const data = jwt_decode(res.credential);

    tabelaUsuario.create({

        email: data.email,
        senha: data.sub,
        nm_usuario: data.given_name,
        sobrenome_usuario: data.family_name

    }).then(function () {
        console.log('Usuário salvo com sucesso! Usuário: ' + usuario);
    }).catch(function (error) {
        console.log('Erro ao salvar usuário: ' + error);
    });

});
*/

/*Validar Login*/
router.post('/valida-login', async function (req, res) {

    const usuario = await tabelaUsuario.findOne({
        attributes: ['email', 'senha', 'nm_usuario', 'tp_perfil'],
        where: {
            email: req.body.email,
            senha: req.body.senha
        }
    })

    if (usuario == null) {

        return res.status(400).json({
            usuario
        });

    } else {

        if (req.body.email == usuario.email && req.body.senha == usuario.senha) {

            return res.status(200).json({
                sucess: true,
                tp_perfil: usuario.tp_perfil
            });

        }
    }
});

module.exports = router;