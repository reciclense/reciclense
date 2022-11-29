document.getElementById('btnGerarRelatorio')
    .addEventListener('click', function () {

        document.getElementById('preloaderRelatorio').style.display = 'block';

        let dtInicio = document.getElementById('dataInicioRelatorio').value;
        let dtFim = document.getElementById('dataFimRelatorio').value;
        let estado = document.getElementById('nm_estado').value;
        let cidade = document.getElementById('nm_cidade').value;
        let bairro = document.getElementById('selectBairroRelatorio').value;
        let material = document.getElementById('selectMaterialRelatorio').value;
        // let turno = document.getElementById('selectTurnoRelatorio').value;

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                dtInicio: dtInicio,
                dtFim: dtFim,
                estado: estado,
                cidade: cidade,
                bairro: bairro,
                material: material
                // turno: turno

            })
        };

        fetch('http://localhost:5500/gerar-relatorio', options)
            .then(response => response.json())
            .then(async response => {

                document.getElementById('preloaderRelatorio').style.display = 'none';

                if (response.success) {

                    await Swal.fire({

                        title: 'Relatório gerado com sucesso!',
                        text: 'Clique no botão abaixo para baixar.',
                        confirmButtonText: 'Baixar',
                        icon: 'success'

                    }).then(async (result) => {

                        if (result.isConfirmed) {

                            const options = {
                                method: 'GET', 
                                headers: {'Content-Type': 'application/json'}};

                            fetch('http://localhost:5500/baixar-relatorio', options)
                              .then(response => response.json())
                              .then(response => console.log(response))
                              .catch(err => console.error(err));
                        }

                    }).catch(err => console.error(err));

                }
            })
            .catch(err => console.error(err));
    });

