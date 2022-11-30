document.getElementById('cep')
    .addEventListener('focusout', function () {

        document.getElementById('preloaderCEP').style.display = 'block';

        let cep = document.getElementById('cep').value;

        let estado = document.getElementById("nm_estado");
        let cidade = document.getElementById("nm_cidade");
        
        let optionEstado = document.createElement('option');
        let optionCidade = document.createElement('option');

        let selectEstados = document.getElementById('nm_estado');
        let selectCidades = document.getElementById('nm_cidade');

        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:5500/consultar-cep/' + cep, options)
            .then(response => response.json())
            .then(response => {

                if (response.success) {

                    document.getElementById('preloaderCEP').style.display = 'none';

                    selectEstados.length = 0;
                    selectCidades.length = 0;

                    document.getElementById("nm_logradouro").value = response.endereco.address;
                    document.getElementById("nm_bairro").value = response.endereco.district;

                    optionEstado.innerHTML = response.estado;
                    optionEstado.value = response.endereco.state;
                    estado.appendChild(optionEstado);

                    optionCidade.innerHTML = response.endereco.city;
                    cidade.appendChild(optionCidade);

                }else{
                    document.getElementById('preloaderCEP').style.display = 'none';
                    Swal.fire('CEP não encontrado!', 'Favor informar um cep válido', 'error');
                }

            })
            .catch(err => console.error(err));

    });