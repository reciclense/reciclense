const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('./db'); //Importando Banco
const tabelaMaterial = require('./material'); //Importando tabela material
const tabelaUsuario = require('./usuario'); //Importando tabela usuario

//Criando tabela coleta
const tabelaColeta = db.define('coleta', {
    cd_coleta: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    horario: {
        type: Sequelize.TIME,
        allowNull: false
    },
    observacao: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, { freezeTableName: true });

//Relacionamento  1-1
tabelaColeta.belongsTo(tabelaMaterial, {
    constraint: true,
    foreignKey: 'cd_material',
    allowNull: false
})

//Relacionamento  1-N
tabelaMaterial.hasMany(tabelaColeta, {
    foreignKey: 'cd_material'
})

//Relacionamento  1-1
tabelaColeta.belongsTo(tabelaUsuario, {
    constraint: true,
    foreignKey: 'cd_usuario',
    allowNull: false
})

//Relacionamento  1-N
tabelaUsuario.hasMany(tabelaColeta, {
    foreignKey: 'cd_usuario'
})

//Método para verificar se tabela já existe
tabelaColeta.sync();

//Exportando entidade
module.exports = tabelaColeta