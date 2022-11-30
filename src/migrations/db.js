const Sequelize = require('sequelize');

const sequelize = new Sequelize('reciclense', 'root', 'reciclense', {
    host: '34.173.4.197',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    }).catch(() => {
        console.log("Erro: Conexão com o banco de dados não foi realizada com sucesso!");
    });

module.exports = sequelize;