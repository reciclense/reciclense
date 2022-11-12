var url = window.location.pathname;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
})

document.addEventListener('DOMContentLoaded', function () {

    let button = document.createElement('button');

    //Armazena o token gerado na constante
    const storageToken = localStorage.getItem("token");

    //Caso o contador seja diferente de um define como zero
    if (localStorage.getItem("contSessaoExpirada") != 1) {

        //Salvando contador no localstorage
        localStorage.setItem("contSessaoExpirada", 0);
    }

    //Configuração da rota
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + storageToken
        }
    };

    fetch('http://localhost:5500/btn-dinamico', options)
        .then(response => response.json())
        .then(async response => {

            //Usuário logado
            if (response.success) {

                localStorage.setItem("contSessaoExpirada", 1);

                //Caso esteja na tela inicial o nome do botão será : 'Área do usuário'
                if (url == "/index.html" || url == "/" || url == '/src/pages/pessoaFisicaPerfil.html' || url == '/src/pages/pessoaJuridicaPerfil.html') {

                    button.type = 'button';
                    button.innerHTML = 'Área do usuário';
                    button.className = 'btn btn-primary';

                    //Função de click para redirecionar para a área do usuário correta
                    button.onclick = function () {

                        if (response.tp_perfil == 'fisica') {
                            window.location.href = "/src/pages/pessoaFisicaPrincipal.html";
                        } else {
                            window.location.href = "/src/pages/pessoaJuridicaPrincipal.html";
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

                }

                //Usuario Deslogado
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

//Deslogar usuario
document.getElementById('btnLogout')
    .addEventListener('click', async function () {

        localStorage.clear();

        await Toast.fire({
            icon: 'warning',
            title: 'Encerrando sessão...'
        })

        window.location.href = "/index.html";
    });

//Sessão expirada
document.addEventListener('click', function () {

    const storageToken = localStorage.getItem("token");

    //Configuração da rota
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + storageToken
        }
    };

    fetch('http://localhost:5500/btn-dinamico', options)
        .then(response => response.json())
        .then(async response => {

            if (!response.success && storageToken != null) {

                //Mostra mensagem de sessão expirada caso contador esteja igual a 1
                if (localStorage.getItem("contSessaoExpirada") == 1) {

                    localStorage.clear();

                    await Toast.fire({
                        icon: 'error',
                        title: 'Sessão expirada!',
                        text: 'Favor realize o login novamente.'
                    })

                    //Seta contador como 2 para que seja reiniciado quando a pagina for recarregada
                    localStorage.setItem("contSessaoExpirada", 2);

                    //Redireciona para pagina de inicio caso não esteja nela
                    if (url != "/index.html" && url != "/") {

                        window.location.href = "/index.html";

                    }

                }
            }
        });
});