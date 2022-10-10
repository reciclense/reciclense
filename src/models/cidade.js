const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('./db'); //Importando Banco
const tabelaEstado = require('./estado');//Importando tabela estado

//Criando tabela cidade
const tabelaCidade = db.define('cidade', {
    cd_cidade: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nm_cidade: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { freezeTableName: true });

//Relacionamento  1-1
tabelaCidade.belongsTo(tabelaEstado, {
    constraint: true,
    foreignKey: 'cd_estado',
    allowNull: false
})

//Relacionamento  1-N
tabelaEstado.hasMany(tabelaCidade, {
    foreignKey: 'cd_estado'
})

//Método para verificar se tabela já existe
tabelaCidade.sync();

//Exportando entidade
module.exports = tabelaCidade