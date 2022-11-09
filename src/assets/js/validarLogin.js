/*Autenticar Usuário*/
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
            .then(async response => {
                if (response.success == false) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Usuário ou senha incorreta!'
                    });
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    await Toast.fire({
                        icon: 'success',
                        title: 'Logado com sucesso'
                    })

                    //Salvando token no localStorage
                    localStorage.setItem("token", response.token);

                    if (response.tp_perfil == 'fisica') {
                        window.location.href = "src/pages/pessoaFisicaPrincipal.html";
                    } else {
                        window.location.href = "src/pages/pessoaJuridicaPrincipal.html";
                    }
                }
            })
            .catch(err => console.error(err));
    });