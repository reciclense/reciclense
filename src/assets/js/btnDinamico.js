document.addEventListener('DOMContentLoaded', function () {

    let button = document.createElement('button');
    let url = window.location.pathname;

    const storageToken = localStorage.getItem("token");

    console.log("token: " + storageToken);

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

            console.log(response);
            //Usuário logado
            if (response.success) {

                var contSessaoExpirada = 0;
                console.log(contSessaoExpirada);

                //Caso esteja na tela inicial o nome do botão será : 'Área do usuário'
                if (url == "/index.html" || url == "/") {

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

                    /*button.onclick = function () {
                        $("#formCadastrarColetor").modal({
                            show: true
                        });
                    };*/

                }

                //Sessão expirada
            } else if (!response.success && storageToken != null) {
                console.log(contSessaoExpirada);

                if (contSessaoExpirada == 0) {

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    await Toast.fire({
                        icon: 'error',
                        title: 'Sessão expirada!',
                        text: 'Favor realize o login novamente.'
                    })

                    contSessaoExpirada = 2;

                    console.log(contSessaoExpirada);
                    console.log(url);

                    if (url != "/index.html" && url != "/") {

                        window.location.href = "/index.html";

                    }

                }

                button.type = 'button';
                button.innerHTML = 'Entrar';
                button.className = 'btn btn-primary';

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

document.getElementById('btnLogout')
.addEventListener('click', async function(){

    localStorage.clear();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      await Toast.fire({
        icon: 'warning',
        title: 'Encerrando sessão...'
      })

      window.location.href = "/index.html";
});
