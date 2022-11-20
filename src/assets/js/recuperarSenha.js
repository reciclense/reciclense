document.getElementById('btnRecuperarSenha')
    .addEventListener('click', function () {

        document.getElementById('btnRecuperarSenha').setAttribute('disabled', '');

        document.getElementById('preloaderRecuperarSenha').style.display = 'block';

        const email = document.getElementById('recuperarSenhaEmail').value;

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email
            })
        };

        fetch('http://localhost:5500/recuperar-senha', options)
            .then(response => response.json())
            .then(response => {

                if (response.success) {

                    document.getElementById('btnRecuperarSenha').removeAttribute('disabled', '');
                    document.getElementById('preloaderRecuperarSenha').style.display = 'none';

                    Swal.fire({
                        icon: 'success',
                        title: 'Email enviado!',
                        text: 'Foi enviado o link de recuperação de senha para seu email.'
                    });

                } else {

                    document.getElementById('btnRecuperarSenha').removeAttribute('disabled', '');
                    document.getElementById('preloaderRecuperarSenha').style.display = 'none';

                    Swal.fire({
                        icon: 'error',
                        title: 'Email não cadastrado!',
                        text: 'Favor informar um email cadastrado no sistema.'
                    });

                }

            })
            .catch(err => console.error(err));

    });