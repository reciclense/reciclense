const express = require('express');
const router = express.Router();

/*Importação de middlewars*/
const { eAdmin } = require('/FICR/reciclense/middlewares/auth');

/*Importação das funções executadas em cada rota*/
const validarLogin = require('../controllers/rotaValidarLogin');
const listarColetas = require('../controllers/rotaListarColetas');
const cadastrarUsuarioGoogle = require('../controllers/rotaLoginGoogle');
const cadastrarUsuario = require('../controllers/rotaCadastrarUsuario');
const atualizarTipoPerfil = require('../controllers/rotaAtualizarTipoPerfil');
const btnDinamico = require('../controllers/rotaBtnDinamico');
const recuperarDadosPerfil = require('../controllers/rotaListarPerfil');

/*Rota que chamar a função validarLogin*/
router.post('/valida-login', validarLogin);

/*Rota que chamar a função  listarColetas*/
router.get('/listar-coletas', listarColetas);

/*Rota para chamar a função cadastrarUsuarioGoogle*/
router.post('/usuario-google', cadastrarUsuarioGoogle);

/*Rota que chamar a função cadastrarUsuario*/
router.post('/cad-usuario', cadastrarUsuario);

/*Rota que chamar a função atualizarTipoPerfil*/
router.put('/atualizar-tipo-perfil', atualizarTipoPerfil);

/*Rota que chamar a função  btnDinamico*/
router.get('/btn-dinamico', eAdmin, btnDinamico);

/*Rota que chamar a função recuperarDadosPerfil*/
router.get('/listar-perfil/:id', recuperarDadosPerfil);

module.exports = router;