const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('./db'); //Importando Banco

//Criando tabela material
const tabelaMaterial = db.define('material', {
    cd_material: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nm_material: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { freezeTableName: true });

//Método para verificar se tabela já existe
tabelaMaterial.sync();

//Exportando entidade
module.exports = tabelaMaterial