const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('../migrations/db'); //Importando Banco

const tabelaEstado = require('../migrations/estado');
const tabelaCidade = require('../migrations/cidade');
const tabelaEndereco = require('../migrations/endereco');
const tabelaCooperativa = require('../migrations/cooperativa');
const tabelaColetor = require('../migrations/coletor');
const tabelaUsuario = require('../migrations/usuario');
const tabelaMaterial = require('../migrations/material');
const tabelaColeta = require('../migrations/coleta');