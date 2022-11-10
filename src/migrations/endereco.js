const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('./db'); //Importando Banco
const tabelaCidade = require('./cidade'); //Importando tabela cidade

//Criando tabela endereço
const tabelaEndereco = db.define('endereco', {
    cd_endereco: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nm_bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nm_logradouro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nm_complemento: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { freezeTableName: true });

//Relacionamento  1-1
tabelaEndereco.belongsTo(tabelaCidade, {
    constraint: true,
    foreignKey: 'cd_cidade',
    allowNull: false
})

//Relacionamento  1-N
tabelaCidade.hasMany(tabelaEndereco, {
    foreignKey: 'cd_estado'
})

//Método para verificar se tabela já existe
tabelaEndereco.sync();

//Exportando entidade
module.exports = tabelaEndereco