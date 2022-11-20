document.getElementById('btnExcluirColetor').addEventListener('click', function () {
    let cpfColetor = document.getElementById('cpfColetor').value


    //Mensagem para confirmar se o usuario quer realmente salvar os dados
    Swal.fire({
        title: 'Deseja realmente excluir o coletor?',
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
            cpfColetor: cpfColetor
        })
    };

    fetch('http://localhost:5500/excluir-coletor', options)
        .then(response => response.json())
        .then(async response => {

            //Caso retorne true os dados foram salvos com sucesso
            if (response.success == true) {

                await Swal.fire('Coletor excluído com sucesso!', '', 'success');
                location.reload();

                //Caso retorne false os dados nao foram salvos   
            } else {
                await Swal.fire('Não foi possível excluir o coletor!', '', 'error');
                location.reload();
            }

        })
        .catch(err => console.error(err));
    } else {
        Swal.fire('Coletor não excluido!', '', 'info');
    }

    });



})