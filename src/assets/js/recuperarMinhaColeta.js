var dataColeta = document.getElementById('dataEditarColeta');
var horarioColeta = document.getElementById('horarioEditarColeta');
var materialColeta = document.getElementById('materialEditarColeta');
var observacaoColeta = document.getElementById('obsEditarColeta');
var btnEditarColeta = document.getElementById('btnEditarColeta');


function recuperarMinhaColeta(cd_coleta, data, horario, cd_material, observacao) {

    dataColeta.value = data;
    horarioColeta.value = horario;
    materialColeta.value = cd_material;
    observacaoColeta.value = observacao;
    console.log(dataColeta.value)

    //Adicionando atributo onclick com a função editarColeta no botão de Salvar
    btnEditarColeta.setAttribute('onclick', 'editarColeta('+ cd_coleta + ')')
    

}

function editarColeta(cd_coleta) {

    let campoVazio = false;

    //Recuperando classe dos inputs do formulário
    let inputs = document.getElementsByClassName('inputsEditarColeta');

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
            data: dataColeta.value,
            horario: horarioColeta.value,
            observacao: observacaoColeta.value,
            cd_material: materialColeta.value,
            cd_coleta: cd_coleta

        })
    };



    fetch('http://localhost:5500/atualizar-coleta', options)
        .then(response => response.json())
        .then(async response => {

            //Caso retorne true os dados foram salvos com sucesso
            if (response.success == true) {

                await Swal.fire('Coleta atualizada com sucesso!', '', 'success');
                location.reload();

                //Caso retorne false os dados nao foram salvos   
            } else {
                await Swal.fire('Não foi possível atualizar os dados da coleta!', '', 'error');
                location.reload();
            }



        })
        .catch(err => console.error(err));
    }

}
