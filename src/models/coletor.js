const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('./db'); //Importando Banco
const tabelaCooperativa = require('./cooperativa');//Importando tabela cooperativa

//Criando tabela coletor
const tabelaColetor = db.define('coletor', {
    cd_coletor: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nm_coletor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome_coletor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    documento_principal: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { freezeTableName: true });

//Relacionamento  1-1
tabelaColetor.belongsTo(tabelaCooperativa, {
    constraint: true,
    foreignKey: 'cd_cooperativa',
    allowNull: false
})

//Relacionamento  1-N
tabelaCooperativa.hasMany(tabelaColetor, {
    foreignKey: 'cd_cooperativa'
})

//Método para verificar se tabela já existe
tabelaColetor.sync();

//Exportando entidade
module.exports = tabelaColetor;