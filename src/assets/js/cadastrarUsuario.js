/*Cadastrar Usuário*/
document.getElementById('btnCriarConta')
    .addEventListener('click', function () {

        let erro = document.querySelector(".alert");
        let campo = document.getElementById('campo-erro');
        let campoEmail = document.getElementById('cadEmail');
        let campoSenha = document.getElementById('cadSenha');
        let email = document.getElementById('cadEmail').value;
        let senha = document.getElementById('cadSenha').value;
        let tp_perfil = document.querySelector('input[name=cadTipo]:checked').value;


        // removendo o elemento da tela sempre que tentar submeter o formulário
        erro.classList.add("d-none");
        $('.is-invalid').removeClass('is-invalid');

        //Validando os campos do formulário de cadastro

        //valida o campo email
        if (campoEmail.value == "") {
            erro.classList.remove("d-none");
            campo.innerHTML = "email" // nome do campo que não foi preenchido!
            campoEmail.focus();
            campoEmail.classList.add("is-invalid");

        }

        //valida o campo senha
        else if (campoSenha.value == "") {
            erro.classList.remove("d-none");
            campo.innerHTML = "senha" // nome do campo que não foi preenchido!
            campoSenha.focus();
            campoSenha.classList.add("is-invalid");
        } else {

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    senha,
                    tp_perfil
                })
            };

            fetch('http://localhost:5500/cad-usuario', options)
                .then(response => response.json())
                .then(async response => {
                    if (response.success == false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Usuário já cadastrado!'
                        });
                    } else {

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
                                        timer: 2000,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                            toast.addEventListener('mouseenter', Swal.stopTimer)
                                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                                        }
                                    })

                                    await Toast.fire({
                                        icon: 'success',
                                        title: 'Cadastrado com sucesso'
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
                    }
                })
                .catch(err => console.error(err));

        }
    });