# Reciclense
Projeto 3° Período ADS -  Reciclense

Este projeto de faculdade que será desenvolvido por nossa equipe da cadeira de Projetos 3, 
onde a equipe sera composta por 3 alunos, Everton Azevedo, Magnum Santos e Vinicius Lima.

Este projeto tem a intenção de facilitar o trabalho dos coletores de lixo reciclável, 
ligando eles as pessoas que possuem esse tipo de material em sua casa para descarte.

## COMO RODAR O PROJETO BAIXADO

### npm install
Instalar todas as dependencias indicada pelo package.json

##COMO CRIAR O PROJETO

Criar o arquivo package.
### npm init

## npm install bootstrap@v5.2.1
Instalar bootstrap

### npm install express
Gerencia as requisições, rotas e URLs, entre outra funcionalidades.

### npm install -g nodemon
Instalar a dependência de forma global, "-g" significa globalmente. Executar o comando através do prompt de comando, executar somente se nunca instalou a dependência na maquina, após instalar, reiniciar a maquina.

## npm install --save-dev nodemon
Instalar a dependência como desenvolvedor para reiniciar o servidor sempre que houver alteração no código fonte.

### npm install --save cors
Permitir acesso a API

### npm install --save sequelize
Sequelize é uma biblioteca Javascript que facilita o gerenciamento de um banco de dados SQL

### npm install --save mysql2
Instalar o drive do banco de dados


## Exemplo de criação de tabela através do Sequelize
const Sequelize = require('sequelize');

const db = require('./db');

const teste = db.define('teste', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text_one:{
        type: Sequelize.STRING,
        allowNull: false
    },
    text_on:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

teste.sync();

module.exports = teste;