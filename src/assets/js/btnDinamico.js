
//    Este arquivo é apenas para que a estrutura de pasta esteja feita ao fazer o commit.


document.addEventListener('DOMContentLoaded', function () {

    let button = document.createElement('button');
    let url = window.location.href.toString();

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

            //Caso esteja na tela pessoaJurídicaPrincipal o nome do botão será : 'Buscar Coleta'
        } else {

            button.type = 'button';
            button.innerHTML = 'Cadastrar Coletor';
            button.className = 'btn btn-primary';

            /*button.onclick = function () {
                $("#formCadastrarColetor").modal({
                    show: true
                });
            };*/

        }

        //Usuario deslogado    
    } else {

        button.type = 'button';
        button.innerHTML = 'Entrar';
        button.className = 'btn btn-primary';

    }

    var btnDinamico = document.getElementById('btnDinamico');
    btnDinamico.appendChild(button);
}, false);

//Autenticação de Login
document.getElementById('btnEntrar')
    .addEventListener('click', function () {

        //Pegando valores dos campos email e senha do formulário
        let email = document.getElementById('exampleInputEmail1').value;
        let senha = document.getElementById('exampleInputPassword1').value;

        //Configuração da rota
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                senha
            })
        };
        //Fetch para redirecionar usuário de acordo com o tp_perfil ou apresentar alert 
        fetch('http://localhost:5500/valida-login', options)
            .then(response => response.json())
            .then(response => {

                if (response.usario == null) {
                    window.alert('Usuário ou senha incorreta!');
                } else {
                    if (response.tp_perfil == 'fisica') {
                        window.location.href = "src/pages/pessoaFisicaPrincipal.html"
                    } else {
                        window.location.href = "src/pages/pessoaJuridicaPrincipal.html"
                    }
                }
            })
            .catch(err => console.error(err));
    });