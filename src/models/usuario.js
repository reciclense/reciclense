/*import * as Sequelize from '/node_modules/sequelize/index.js';
import * as db from '/src/models/db.js';
import * as tabelaEndereco from '/src/models/endereco.js';
import * as tabelaCooperativa from '/src/models/cooperativa.js';*/


const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('../models/db'); //Importando Banco
const tabelaEndereco = require('../models/endereco');//Importando tabela endereco
const tabelaCooperativa = require('../models/cooperativa');//Importando tabela cooperativa

//Criando tabela usuario
const tabelaUsuario = db.define('usuario', {
    cd_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nm_usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome_usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tp_perfil: {
        type: Sequelize.STRING,
        allowNull: true
    },
    documento_principal: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, { freezeTableName: true });

//Relacionamento  1-1
tabelaUsuario.belongsTo(tabelaEndereco, {
    constraint: true,
    foreignKey: 'cd_endereco',
    allowNull: true
})

//Relacionamento  1-N
tabelaEndereco.hasMany(tabelaUsuario, {
    foreignKey: 'cd_endereco'
})

//Relacionamento  1-1
tabelaUsuario.belongsTo(tabelaCooperativa, {
    constraint: true,
    foreignKey: 'cd_cooperativa',
    allowNull: true
})

//Relacionamento  1-N
tabelaCooperativa.hasMany(tabelaUsuario, {
    foreignKey: 'cd_cooperativa'
})

//Método para verificar se tabela já existe
tabelaUsuario.sync();

//Exportando entidade
module.exports = tabelaUsuario;