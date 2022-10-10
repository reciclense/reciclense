const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('./db'); //Importando Banco

//Criando tabela estado
const tabelaEstado = db.define('estado', {
    cd_estado: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nm_estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sigla_uf: {
        type: Sequelize.CHAR,
        allowNull: false
    }
}, { freezeTableName: true });

//Método para verificar se tabela já existe
tabelaEstado.sync();

//Exportando entidade
module.exports = tabelaEstado