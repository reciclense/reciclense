function editarColetor(nome, sobrenome, nascimento, cpf) {

    cpfAtual = cpf;

    var nomeColetor = document.getElementById('nomeColetor');
    var sobrenomeColetor = document.getElementById('sobrenomeColetor');
    var nascimentoColetor = document.getElementById('nascimentoColetor');
    var cpfColetor = document.getElementById('cpfColetor');


    nomeColetor.value = nome;
    sobrenomeColetor.value = sobrenome;
    cpfColetor.value = cpf;
    nascimentoColetor.value = nascimento;

}

/*Função para atualizar os dados do coletor*/
document.getElementById('btnEditarColetor').addEventListener('click', async function () {

    let campoVazio = false;

    //Recuperando classe dos inputs do formulário
    let inputs = document.getElementsByClassName('inputsColetor');

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
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nm_coletor: nomeColetor.value,
                sobrenome_coletor: sobrenomeColetor.value,
                cpfAtual: cpfAtual

            })
        };

       

        fetch('http://localhost:5500/atualizar-coletor', options)
            .then(response => response.json())
            .then(async response => {

                //Caso retorne true os dados foram salvos com sucesso
                if (response.success == true) {

                    await Swal.fire('Dados atualizados com sucesso!', '', 'success');
                    location.reload();

                    //Caso retorne false os dados nao foram salvos   
                } else {
                    await Swal.fire('Não foi possível atualizar os dados do coletor!', '', 'error');
                    location.reload();
                }

            })
            .catch(err => console.error(err));

    }
})