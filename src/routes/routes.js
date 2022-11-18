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
const verificarDadosPerfil = require('../controllers/rotaValidarDadosPerfil');
const cadastrarColetor = require('../controllers/rotaCadastrarColetor');
const excluirUsuario = require('../controllers/rotaExcluirUsuario');
const recuperarEstados = require('../controllers/rotaRecuperarEstados');
const recuperarCidades = require('../controllers/rotaRecuperarCidades');
const consultarCEP = require('../controllers/rotaConsultarCEP');
const recuperarNomeEstado = require('../controllers/rotaRecuperarNomeEstado');

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

/*Rota que chamar a função verificarDadosPerfil*/
router.get('/validar-dados-perfil/:id/:perfil', verificarDadosPerfil);

/*Rota que chamar a função recuperarEstados*/
router.get('/recuperar-estados/:id', recuperarEstados);

/*Rota que chamar a função recuperarCidades*/
router.get('/recuperar-cidades/:uf', recuperarCidades);

/*Rota que chamar a função consultarCEP*/
router.get('/consultar-cep/:cep', consultarCEP);

 /*Rota que chamar a função recuperarNomeEstado*/
 router.get('/recuperar-nome-estado/:uf', recuperarNomeEstado);

module.exports = router;