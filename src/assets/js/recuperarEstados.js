document.addEventListener('DOMContentLoaded', function () {

    let selectEstados = document.getElementById('nm_estado');
    const storageIdUsuario = localStorage.getItem("id_usuario");

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://localhost:5500/recuperar-estados/' + storageIdUsuario, options)
        .then(response => response.json())
        .then(response => {

            if (response.success) {

                selectEstados.length = 0;

                let optionPadrao = document.createElement('option');
                optionPadrao.innerHTML = 'Selecione seu estado';
                selectEstados.appendChild(optionPadrao);

                response.estados.forEach(element => {

                    let optionEstados = document.createElement('option');
                    optionEstados.innerHTML = element.nm_estado;
                    optionEstados.value = element.sigla_uf;
                    selectEstados.appendChild(optionEstados);

                });
            }
        })
        .catch(err => console.error(err));
});