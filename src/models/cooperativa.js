const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('./db'); //Importando Banco
const tabelaEndereco = require('./endereco');//Importando tabela endereco

//Criando tabela cooperativa
const tabelaCooperativa = db.define('cooperativa', {
    cd_cooperativa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    razao_social: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { freezeTableName: true });

//Relacionamento  1-1
tabelaCooperativa.belongsTo(tabelaEndereco, {
    constraint: true,
    foreignKey: 'cd_endereco',
    allowNull: false
})

//Relacionamento  1-N
tabelaEndereco.hasMany(tabelaCooperativa, {
    foreignKey: 'cd_endereco'
})

//Método para verificar se tabela já existe
tabelaCooperativa.sync();

//Exportando entidade
module.exports = tabelaCooperativa;