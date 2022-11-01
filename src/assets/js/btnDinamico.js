
document.addEventListener('DOMContentLoaded', function () {

    let button = document.createElement('button');
    let url = window.location.pathname;

    const storageToken = localStorage.getItem("token");


    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + storageToken
        }
    };

    fetch('http://localhost:5500/btnDinamico', options)
        .then(response => response.json())
        .then(response => {

            console.log(response);
            
            //Usuário logado
            if (storageToken) {

                //Caso esteja na tela inicial o nome do botão será : 'Área do usuário'
                if (url == "/index.html" || url == "/") {

                    button.type = 'button';
                    button.innerHTML = 'Área do usuário';
                    button.className = 'btn btn-primary';

                    button.onclick = function () {

                        if (response.tp_perfil == 'fisica') {
                            window.location.href = "/src/pages/pessoaFisicaPrincipal.html"
                        } else {
                            window.location.href = "/src/pages/pessoaJuridicaPrincipal.html"
                        }

                    };

                    //Caso esteja na tela pessoaFisícaPrincipal o nome do botão será : 'Solicitar Coleta'
                } else if (url == "/src/pages/pessoaFisicaPrincipal.html") {

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
        })
        .catch(err => console.error(err));



    var btnDinamico = document.getElementById('btnDinamico');
    btnDinamico.appendChild(button);
}, false);