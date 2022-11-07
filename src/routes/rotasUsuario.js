/*Configurações*/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { eAdmin } = require('/FICR/reciclense/middlewares/auth');
const acessoToken = "D587SCF4712TESC930WYZS4G52UMLOP51ZA56611A";

/*Importação das tabelas*/
const tabelaUsuario = require('/FICR/reciclense/src/models/usuario');
const tabelaColeta = require('/FICR/reciclense/src/models/coleta');
const tabelaEndereco = require('/FICR/reciclense/src/models/endereco');
const tabelaCidade = require('/FICR/reciclense/src/models/cidade');
const tabelaEstado = require('/FICR/reciclense/src/models/estado');

/*Rota para validar se usuário está logado*/
router.get('/btn-dinamico', eAdmin, async (req, res) => {

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

/*Rota para verificar se o usuario ja logou com o google antes*/
router.post('/busca-usuario-google', async function (req, res){

    let dados = req.body;

    // Verificando se email ja existe na tabela de Usuários
    const buscarEmail = await tabelaUsuario.findOne({
        attributes: ['email'],
        where: {
            email: dados.email
        }
    });

    if (buscarEmail == null) {

        return res.status(400).json({
            existeUsuario: false
        });

    } else {
        return res.status(200).json({
            existeUsuario: true
        });
    }
});

/*Rota para salvar dados do Login com o Google*/
router.post('/usuario-google', async function (req, res) {

    let dados = req.body;

    // Verificando se email ja existe na tabela de Usuários
    const buscarEmail = await tabelaUsuario.findOne({
        attributes: ['email'],
        where: {
            email: dados.email
        }
    });

    if (buscarEmail != null) {

        return res.status(400).json({
            success: false
        });

    } else {

        const senhaCripto = await bcrypt.hash(dados.senha, 8);

        tabelaUsuario.create({

            email: dados.email,
            senha: senhaCripto,
            nm_usuario: dados.nome,
            sobrenome_usuario: dados.sobrenome,
            tp_perfil: dados.perfil

        }).then(function () {

            return res.status(200).json({
                success: true,
                tp_perfil: dados.perfil
            });

        }).catch(function (error) {

            return res.status(400).json({
                success: false
            });

        });
    }
});


/*Rota para Autenticar Login*/

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

            let token = jwt.sign({ id: usuario.cd_usuario }, acessoToken, {
                expiresIn: 45 //30min
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

/*Rota para Cadastrar Usuário*/
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
});

/*Rota para Listar Usuários*/

router.get('/listar-coletas', async function (req, res) {

    const coletas = await tabelaColeta.findAll({
        attributes: ['data', 'horario', 'observacao'],
        include: [
            {
                model: tabelaUsuario,
                attributes: ['nm_usuario'],
                include: {
                    model: tabelaEndereco,
                    attributes: ['cep', 'nm_bairro', 'nm_logradouro', 'numero', 'nm_complemento'],
                    include: {
                        model: tabelaCidade,
                        attributes: ['nm_cidade'],
                        include: {
                            model: tabelaEstado,
                            attributes: ['sigla_uf']
                        }
                    }
                }
            }
        ]

    })
        .then(function (coletas) {
            return res.status(200).json({
                success: true,
                dados: coletas
            });
        }).catch(function (erro) {
            return res.status(400).json({
                success: false,
                messagem: erro.message
            });
        });



});



module.exports = router;