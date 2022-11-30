/*Função para excluir o perfil do usuario*/
document.getElementById('btnExcluirPerfil')
    .addEventListener('click', function () {

        //Recuperando valores id_usuario e perfil do localStorage
        const storageIdUsuario = localStorage.getItem('id_usuario');
        const storagePerfil = localStorage.getItem('perfil');

        //Mensagem para confirmar se o usuario quer realmente salvar os dados
        Swal.fire({
            title: 'Você quer realmente excluir o seu perfil?',
            text: 'Após a confirmação não será mais possível recuperar seus dados.',
            showDenyButton: true,
            confirmButtonText: 'Excluir',
            denyButtonText: 'Cancelar',
        }).then(async (result) => {

            //Caso o usuario clice em salvar chama a rota para atualizar o perfil
            if (result.isConfirmed) {

                const options = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: storageIdUsuario,
                        perfil: storagePerfil
                    })
                };

                fetch('http://localhost:5500/excluir-usuario', options)
                    .then(response => response.json())
                    .then(async response =>  {

                        if(response.success){
                            await Swal.fire('Perfil excluido com sucesso!', '', 'success');
                            window.location.href = "/index.html";
                        }else{
                            Swal.fire('Não foi possível salvar os seus dados!', '', 'error');
                        }
                    })
                    .catch(err => console.error(err));

            } else {
                Swal.fire('Conta não excluida!', 'Obrigado por continuar conosco', 'info');
            }
        })
    });
