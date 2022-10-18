const express = require('express');
const router = express.Router();

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
router.post('/valida-login', function(req, res){
    res.send("Email: " + req.body.email + "<br>Senha: " + req.body.senha + "<br");
});

module.exports = router;