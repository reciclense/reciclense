const Sequelize = require('sequelize');

const sequelize = new Sequelize('heroku_7f13a4e47728432', 'b5248dea236e15', 'a238f0e4', {
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    }).catch(() => {
        console.log("Erro: Conexão com o banco de dados não foi realizada com sucesso!");
    });

module.exports = sequelize;