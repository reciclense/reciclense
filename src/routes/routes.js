const express = require('express');
const router = express.Router();

/*Importação de middlewars*/
const { eAdmin } = require('/FICR/reciclense/middlewares/auth');

/*Importação das funções executadas em cada rota*/
const validarLogin = require('../controllers/rotaValidarLogin');
const listarColetas = require('../controllers/rotaListarColetas');
const cadastrarUsuarioGoogle = require('../controllers/rotaLoginGoogle');
const cadastrarUsuario = require('../controllers/rotaCadastrarUsuario');
const salvarTipoPerfil = require('../controllers/rotaSalvarTipoPerfil');
const btnDinamico = require('../controllers/rotaBtnDinamico');
const recuperarDadosPerfil = require('../controllers/rotaRecuperarDadosPerfil');
const atualizarDadosPerfil = require('../controllers/rotaAtualizarDadosPerfil');
const cadastrarColetor = require('../controllers/rotaCadastrarColetor');
const excluirUsuario = require('../controllers/rotaExcluirUsuario');
const cadastrarColeta = require('../controllers/rotaCadastrarColeta');

/*Rota que chamar a função validarLogin*/
router.post('/valida-login', validarLogin);

/*Rota que chamar a função  listarColetas*/
router.get('/listar-coletas', listarColetas);

/*Rota para chamar a função cadastrarUsuarioGoogle*/
router.post('/usuario-google', cadastrarUsuarioGoogle);

/*Rota que chamar a função cadastrarUsuario*/
router.post('/cad-usuario', cadastrarUsuario);

/*Rota que chamar a função atualizarTipoPerfil*/
router.put('/salvar-tipo-perfil', salvarTipoPerfil);

/*Rota que chamar a função  btnDinamico*/
router.get('/btn-dinamico', eAdmin, btnDinamico);

/*Rota que chamar a função recuperarDadosPerfil*/
router.get('/recuperar-dados-perfil/:id/:perfil', recuperarDadosPerfil);

/*Rota que chamar a função salvarDadosPerfil*/
router.put('/atualizar-dados-perfil', atualizarDadosPerfil);

/*Rota que chamar a função cadastrarColetor*/
router.post('/cadastrar-coletor', cadastrarColetor);

/*Rota que chamar a função excluirUsuario*/
router.delete('/excluir-usuario', excluirUsuario);

/*Rota que chamar a função cadastrarColeta*/
router.post('/cadastrar-coleta', cadastrarColeta);

module.exports = router;