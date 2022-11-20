document.getElementById('btnSolicitarColeta')
    .addEventListener('click', function () {

        //Recuperando valores id_usuario e perfil do localStorage
        const storageIdUsuario = localStorage.getItem('id_usuario');

        let data = document.getElementById('data-coleta');
        let horario = document.getElementById('horario-coleta');
        let material = document.getElementById('material-coleta');
        let observacao = document.getElementById('obs-coleta');
        let campoVazio = false;

        //Recuperando classe dos inputs do formulário
        let inputs = document.getElementsByClassName('inputsColeta');
        
        //Removendo o atributo de erro dos inputs
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("is-invalid");
        }
        
        //Verificando se algum campo está vazio
        for (let i = 0; i < inputs.length; i++) {

            if (inputs[i].value == "") {
                inputs[i].classList.add("is-invalid");
                campoVazio = true;
            }
        }

        //Se tiver algum input vazio, exiba a mensagem de erro
        if (campoVazio == true) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha todos os campos!'
            });

        } else {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: data.value,
                horario: horario.value,
                material: material.value,
                observacao: observacao.value,
                usuario: storageIdUsuario
            })
        };

        fetch('http://localhost:5500/cadastrar-coleta', options)
            .then(response => response.json())
            .then(async response => {
                if (response.success == false) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Erro ao cadastrar coleta!'
                    });
                } else {
                    await Swal.fire('Coleta cadastrada com sucesso!', '', 'success');
                    location.reload();
                }
            }).catch(err => console.error(err));

        }
    });