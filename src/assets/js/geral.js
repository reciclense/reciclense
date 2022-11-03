//Mascara para CPF
function mascaraCpf(i) {

    var v = i.value;

    if (isNaN(v[v.length - 1])) { // impede entrar outro caractere que não seja número
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";

}

//Mascara para cnpj
function mascaraCnpj(i) {

    var v = i.value;

    if (isNaN(v[v.length - 1])) { // impede entrar outro caractere que não seja número
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "18");
    if (v.length == 2 || v.length == 6) i.value += ".";
    if (v.length == 10) i.value += "/";
    if (v.length == 15) i.value += "-";

}

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

                        // Verificando o tipo de usuário para direcionar para a tela correta
                        if (response.tp_perfil == "fisica") {
                            window.location.href = "src/pages/pessoaFisicaPrincipal.html"
                        } else if (response.tp_perfil == "juridica") {
                            window.location.href = "src/pages/pessoaJuridicaPrincipal.html"
                        }
                    }
                })
                .catch(err => console.error(err));

        }
    });

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
                        timer: 2000,
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

