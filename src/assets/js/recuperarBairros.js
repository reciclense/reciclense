document.addEventListener('DOMContentLoaded', function () {

    let selectBairros = document.getElementById('selectBairroRelatorio');
    selectBairros.length = 0;

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://localhost:5500/recuperar-bairros', options)
        .then(response => response.json())
        .then(response => {

            // for (let i = 0; i < response.dados.length; i++) {
            //     console.log('BAIRRO: ' + response.dados[i].usuario.endereco.nm_bairro);
            // }
            if (response.success) {

                selectBairros.length = 0;

                let optionPadrao = document.createElement('option');
                optionPadrao.innerHTML = 'Todos os bairros';
                selectBairros.appendChild(optionPadrao);

                response.dados.forEach(element => {

                    for (let i = 0; i < selectBairros.length; i++) {

                        if (element.usuario.endereco.nm_bairro != selectBairros[i].innerHTML) {

                            let optionBairros = document.createElement('option');
                            optionBairros.innerHTML = element.usuario.endereco.nm_bairro;
                            selectBairros.appendChild(optionBairros);
                        }

                    }

                });
            }

        })
        .catch(err => console.error(err));
});