document.addEventListener('DOMContentLoaded', function frontValidarDadosPerfil() {

    const storageIdUsuario = localStorage.getItem('id_usuario');
    const storagePerfil = localStorage.getItem('perfil');

    let perfilIncompleto = true;

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://localhost:5500/validar-dados-perfil/' + storageIdUsuario + '/' + storagePerfil, options)
        .then(response => response.json())
        .then(async response => {

            if (!response.success) {

                while (perfilIncompleto == true) {

                    await Swal.fire({
                        icon: 'warning',
                        title: 'Necessário atualizar perfil...',
                        text: 'Atualize seus dados para continuar utilizando o sistema!',
                        confirmButtonText: 'Atualizar dados',
                    }).then(async (result) => {

                        if (result.isConfirmed) {

                            perfilIncompleto = false;

                            if (response.perfil == 'fisica') {
                                window.location.href = '/src/pages/pessoaFisicaPerfil.html';
                            } else {
                                window.location.href = '/src/pages/pessoaJuridicaPerfil.html';
                            }
                        }
                    })
                }
            }
        })
        .catch(err => console.error(err));
});

