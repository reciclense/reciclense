document.getElementById('btnCadastrarColetor')
    .addEventListener('click', function () {

        //Recuperando valores id_usuario e perfil do localStorage
        const storageIdUsuario = localStorage.getItem('id_usuario');

        let erro = document.querySelector(".alert");
        let campo = document.getElementById('campo-erro');
        let nome = document.getElementById('nome-coletor');
        let sobrenome = document.getElementById('sobrenome-coletor');
        let cpf = document.getElementById('cpf-coletor');

        // removendo o elemento da tela sempre que tentar submeter o formulário
        erro.classList.add("d-none");
        $('.is-invalid').removeClass('is-invalid');

        //valida o campo nome
        if (nome.value == "") {
            erro.classList.remove("d-none");
            campo.innerHTML = "nome" // nome do campo que não foi preenchido!
            nome.focus();
            nome.classList.add("is-invalid");

            //valida o campo sobrenome
        } else if (sobrenome.value == "") {
            erro.classList.remove("d-none");
            campo.innerHTML = "sobrenome"
            sobrenome.focus();
            sobrenome.classList.add("is-invalid");

            //valida o campo cpf
        } else if (cpf.value == "") {
            erro.classList.remove("d-none");
            campo.innerHTML = "cpf"
            cpf.focus();
            cpf.classList.add("is-invalid");
        } else {

            //Configuração da requisição
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    nm_coletor: nome.value,
                    sobrenome_coletor: sobrenome.value,
                    documento_principal: cpf.value,
                    id_juridico: storageIdUsuario
                })

            };

            fetch('http://localhost:5500/cadastrar-coletor', options)
                .then(response => response.json())
                .then(async response => {
                    if (response.success == false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Coletor já cadastrado!'
                        });
                    } else {
                        await Swal.fire('Coletor cadastrado com sucesso!', '', 'success');
                        location.reload();
                    }
                }).catch(err => console.error(err));
        }
    });