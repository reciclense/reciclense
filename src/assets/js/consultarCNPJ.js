function consultarCNPJ(cnpj) {

    let estado = document.getElementById("nm_estado");
    let cidade = document.getElementById("nm_cidade");
    
    let optionEstado = document.createElement('option');
    let optionCidade = document.createElement('option');

    let selectEstados = document.getElementById('nm_estado');
    let selectCidades = document.getElementById('nm_cidade');

    cnpjSemPonto = cnpj.replace('.', '');
    cnpjSemPonto1 = cnpjSemPonto.replace('.', '');
    cnpjSemBarra = cnpjSemPonto1.replace('/', '');
    cnpjFinal = cnpjSemBarra.replace('-', '');

    $.ajax({

        'url': 'https://receitaws.com.br/v1/cnpj/' + cnpjFinal,
        'type': 'GET',
        'dataType': 'jsonp',
        'success': function (data) {
            
            if (data.nome == undefined) {
                Swal.fire('CNPJ não encontrado!', 'Favor informar um cnpj válido', 'error');
            } else {
                
                document.getElementById('razaoSocial').value = data.nome;
                document.getElementById('nm_bairro').value = data.bairro;
                document.getElementById('numero').value = data.numero;
                document.getElementById('nm_logradouro').value = data.logradouro;

                let cep = data.cep.replace('.', '');
                document.getElementById('cep').value = cep;

                const options = {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  };
                  
                  fetch('http://localhost:5500/recuperar-nome-estado/'+ data.uf, options)
                    .then(response => response.json())
                    .then(response =>{

                        selectEstados.length = 0;
                        optionEstado.innerHTML = response.nome_estado.toUpperCase();
                        optionEstado.value = response.nome_estado
                        estado.appendChild(optionEstado);
                    })
                    .catch(err => console.error(err));

                selectCidades.length = 0;
                optionCidade.innerHTML = data.municipio;
                cidade.appendChild(optionCidade);

                
            }

        }

    });

}