
//    Este arquivo é apenas para que a estrutura de pasta esteja feita ao fazer o commit.


document.addEventListener('DOMContentLoaded', function () {

    var button = document.createElement('button');
    var url = window.location.href.toString();
    console.log(url);

    //Usuário logado
    if (1 == 2) {

        //Caso esteja na tela inicial o nome do botão será : 'Área do usuário'
        if (url == "http://127.0.0.1:5500/" || url == "http://127.0.0.1:5500/index.html" || url == "http://localhost:5500/") {

            button.type = 'button';
            button.innerHTML = 'Área do usuário';
            button.className = 'btn btn-primary';

            button.onclick = function () {

                /*const Sequelize = require('sequelize');

                const db = require('./db');

                const tpUsuario = db.define('teste', {
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

                tpUsuario.sync();

                module.exports = tpUsuario;*/

                if (1 == 2) {
                    window.location.href = "http://127.0.0.1:5500/src/pages/pessoaFisicaPrincipal.html"
                } else {
                    window.location.href = "http://127.0.0.1:5500/src/pages/pessoaJuridicaPrincipal.html"
                }

            };

            //Caso esteja na tela pessoaFisícaPrincipal o nome do botão será : 'Solicitar Coleta'
        } else if (url == "http://127.0.0.1:5500/src/pages/pessoaFisicaPrincipal.html") {

            button.type = 'button';
            button.innerHTML = 'Solicitar Coleta';
            button.className = 'btn btn-primary';

            button.onclick = function () {
                $("#formSolicitarColeta").modal({
                    show: true
                });
            };


            //Caso esteja na tela pessoaJurídicaPrincipal o nome do botão será : 'Buscar Coleta'
        } else {

            button.type = 'button';
            button.innerHTML = 'Cadastrar Coletor';
            button.className = 'btn btn-primary';

            button.onclick = function () {
                $("#formCadastrarColetor").modal({
                    show: true
                });
            };

        }

        //Usuario deslogado    
    } else {

        button.type = 'button';
        button.innerHTML = 'Entrar';
        button.className = 'btn btn-primary';

        button.onclick = function () {
            $("#formLogin").modal({
                show: true
            });
        };

    }

    var btnDinamico = document.getElementById('btnDinamico');
    btnDinamico.appendChild(button);
}, false);

function chamarModalCadastro() {
    $("#formCadastro").modal({
        show: true
    });
};

