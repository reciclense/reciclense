/*Função para atualizar o perfil do usuario*/
document.getElementById('btnSalvarPerfil')
    .addEventListener('click', function () {

        //Recuperando valores id_usuario e perfil do localStorage
        const storageIdUsuario = localStorage.getItem('id_usuario');
        const storagePerfil = localStorage.getItem('perfil');

        //Recuperando valores do formulario da tela meu perfil
        let nome = document.getElementById('nm_usuario').value;
        let sobrenome = document.getElementById('sobrenome_usuario').value;
        let cpf = document.getElementById('documento_principal').value;
        let estado = document.getElementById('nm_estado').value;
        let cidade = document.getElementById('nm_cidade').value;
        let cep = document.getElementById('cep').value;
        let bairro = document.getElementById('nm_bairro').value;
        let rua = document.getElementById('nm_logradouro').value;
        let numero = document.getElementById('numero').value;
        let complemento = document.getElementById('nm_complemento').value;

        if (storagePerfil == 'juridica') {
            var razaoSocial = document.getElementById('razaoSocial').value;
            var cnpj = document.getElementById('cnpj').value;
        }

        //Recuperando classe dos botoes salvar e dos campos do formulário de cada tipo de perfil
        var inputs = document.getElementsByClassName("inputsPerfil");
        var botoes = document.getElementsByClassName("botoesPerfil");

        //Mensagem para confirmar se o usuario quer realmente salvar os dados
        Swal.fire({
            title: 'Você deseja salvar essas mudanças?',
            showDenyButton: true,
            confirmButtonText: 'Salvar',
            denyButtonText: 'Cancelar',
        }).then(async (result) => {

            //Caso o usuario clice em salvar chama a rota para atualizar o perfil
            if (result.isConfirmed) {

                //Configuração da requisição
                const options = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({

                        id: storageIdUsuario,
                        perfil: storagePerfil,
                        nome: nome,
                        sobrenome: sobrenome,
                        cpf: cpf,
                        razaoSocial: razaoSocial,
                        cnpj: cnpj,
                        estado: estado,
                        cidade: cidade,
                        cep: cep,
                        bairro: bairro,
                        rua: rua,
                        numero: numero,
                        complemento: complemento
                    })

                };

                //Chamada da requisição
                fetch('http://localhost:5500/atualizar-dados-perfil', options)
                    .then(response => response.json())
                    .then(response => {

                        //Caso retorne true os dados foram salvos com sucesso
                        if (response.success) {

                            Swal.fire('Dados salvos com sucesso!', '', 'success');

                            //Desabilitando campos do formulario novamente
                            for (var i = 0; i < inputs.length; i++) {
                                inputs[i].setAttribute("disabled", '');
                            }

                            //Escondendo o botão salvar novamente
                            for (var i = 0; i < botoes.length; i++) {
                                botoes[i].setAttribute("hidden", '');
                            }
                            //Caso retorne false os dados nao foram salvos   
                        } else {
                            Swal.fire('Não foi possível salvar os seus dados!', '', 'error');
                        }

                    })
                    .catch(err => console.error(err));
                //Caso o usuario clique em cancelar não salva os dados
            } else if (result.isDenied) {

                Swal.fire('Alterações canceladas!', '', 'info');

                //Desabilitando campos do formulario novamente
                for (var i = 0; i < inputs.length; i++) {
                    inputs[i].setAttribute("disabled", '');
                }

                //Escondendo o botão salvar novamente
                for (var i = 0; i < botoes.length; i++) {
                    botoes[i].setAttribute("hidden", '');
                }
            }
        })
    });