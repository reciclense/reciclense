const Sequelize = require('sequelize');

const sequelize = new Sequelize('reciclense', 'admin', 'reciclense', {
    host: 'reciclense.crzurtgts5qu.sa-east-1.rds.amazonaws.com',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    }).catch(() => {
        console.log("Erro: Conexão com o banco de dados não foi realizada com sucesso!");
    });

module.exports = sequelize;