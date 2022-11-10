const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('./db'); //Importando Banco
const tabelaEndereco = require('./endereco');//Importando tabela endereco
const tabelaCooperativa = require('./cooperativa');//Importando tabela cooperativa

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
        allowNull: true
    },
    sobrenome_usuario: {
        type: Sequelize.STRING,
        allowNull: true
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