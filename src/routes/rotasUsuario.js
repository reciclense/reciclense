const express = require('express');
const router = express.Router();
const tabelaUsuario = require('/FICR/reciclense/src/models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Configurações
const {eAdmin} = require('/FICR/reciclense/middlewares/auth');

router.get('/btnDinamico', eAdmin, async (req, res) =>{
    
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
});

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

    let dados = req.body;

    const usuario = await tabelaUsuario.findOne({
        attributes: ['cd_usuario', 'email', 'senha', 'nm_usuario', 'tp_perfil'],
        where: {
            email: dados.email
        }
    });

    if (usuario == null) {

        return res.status(400).json({
            success: false
        });

    } else {

        if (await bcrypt.compare(dados.senha, usuario.senha)) {

            let token = jwt.sign({ id: usuario.cd_usuario }, "D587SCF4712TESC930WYZS4G52UMLOP51ZA56611A", {
                expiresIn: 1800 //30min
            });

            return res.status(200).json({
                success: true,
                tp_perfil: usuario.tp_perfil,
                token
            });

        } else {

            return res.status(400).json({
                success: false
            });

        }
    }

});

/* Cadastrar Usuário*/
router.post('/cad-usuario', async function (req, res) {

    let dados = req.body;

    // Verificando se email ja existe na tabela de Usuários
    const buscarEmail = await tabelaUsuario.findOne({
        attributes: ['email'],
        where: {
            email: dados.email
        }
    });


    // Se nenhum email igual for encontrado, irá permitir fazer o login
    if (buscarEmail != null) {

        return res.status(400).json({
            success: false
        });

    } else {

        const senhaCripto = await bcrypt.hash(dados.senha, 8);

        tabelaUsuario.create({
            email: dados.email,
            senha: senhaCripto,
            tp_perfil: dados.tp_perfil
        }).then(function () {
            return res.status(200).json({
                success: true,
                tp_perfil: dados.tp_perfil
            });
        }).catch(function (erro) {
            return res.status(400).json({
                success: false
            });
        });
    }
})

module.exports = router;