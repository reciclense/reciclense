document.getElementById('mostrarSenha')
    .addEventListener('click', function () {

        const checkBox = document.getElementById('cadSenha');

        if (checkBox.type == 'password') {

            document.getElementById('cadSenha').type = 'text';
            document.getElementById('cadConfirmaSenha').type = 'text';

            controleClique = 1;

        } else {

            document.getElementById('cadSenha').type = 'password';
            document.getElementById('cadConfirmaSenha').type = 'password';

        }
    });

document.getElementById('btnSalvarRedefinirSenha')
    .addEventListener('click', function () {

        const urlParams = new URLSearchParams(window.location.search);

        let id_usuario = urlParams.get('usuario');
        let token = urlParams.get('token');

        let senha = document.getElementById('cadSenha').value;
        let senhaConfirmada = document.getElementById('cadConfirmaSenha').value;


        if (senha != senhaConfirmada) {

            document.getElementById('senhasIguais').innerHTML = "<span style='color: #ff0000'><b>Senhas devem ser iguais</b></span>";

        } else {

            document.getElementById('senhasIguais').innerHTML = "";

            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senha: senha,
                    senhaConfirmada: senhaConfirmada,
                    id: id_usuario,
                    token: token
                })
            };

            fetch('http://localhost:5500/redefinir-senha', options)
                .then(response => response.json())
                .then(async response => {

                    if (response.success) {

                        await Swal.fire('Senha atualizada com sucesso!', 'Realize login com sua nova senha.', 'success');

                        window.location.href = '/index.html'

                    } else if (response.code_error == 2) {

                        await Swal.fire('Link expirado!', 'Favor solicitar um novo link de recuperação de senha.', 'error');

                        window.location.href = '/index.html'

                    } else {

                        await Swal.fire('Não foi possível atualizar sua senha!', 'Favor tente novamente mais tarde', 'error');

                        window.location.href = '/index.html'

                    }
                })
                .catch(err => console.error(err));
        }
    })