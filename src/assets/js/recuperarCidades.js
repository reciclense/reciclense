document.getElementById('nm_estado')
    .addEventListener('change', function () {

        let selectCidades = document.getElementById('nm_cidade');
        let UF = document.getElementById('nm_estado').value;

        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:5500/recuperar-cidades/' + UF, options)
            .then(response => response.json())
            .then(response => {

                selectCidades.length = 0;

                let optionPadrao = document.createElement('option');
                optionPadrao.innerHTML = 'Aguarde, carregando cidades';
                selectCidades.appendChild(optionPadrao);

                setTimeout(() => {

                    selectCidades.length = 0;
                    optionPadrao.innerHTML = 'Todas as cidades';
                    selectCidades.appendChild(optionPadrao);

                    response.cidades.forEach(element => {

                        let optionCidades = document.createElement('option');
                        optionCidades.innerHTML = element.nm_cidade;
                        selectCidades.appendChild(optionCidades);

                    });

                }, 700);

            })
            .catch(err => console.error(err));
    });