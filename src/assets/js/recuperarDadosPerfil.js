//Recuperando valores id_usuario e perfil do localStorage
const storageIdUsuario = localStorage.getItem("id_usuario");
const storagePerfil = localStorage.getItem("perfil");
const storageGoogle = localStorage.getItem("google");

const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};

//Configuração da rota
fetch('http://localhost:5500/recuperar-dados-perfil/' + storageIdUsuario + '/' + storagePerfil, options)
    .then(response => response.json())
    .then(response => {

        let inputs = document.getElementsByClassName("inputsPerfil");
        let controlaNulo = 'false';

        let estado = document.getElementById("nm_estado")
        let cidade = document.getElementById("nm_cidade");

        let optionEstado = document.createElement('option');
        let optionCidade = document.createElement('option');

        let selectEstados = document.getElementById('nm_estado');
        let selectCidades = document.getElementById('nm_cidade');


        if (storagePerfil == 'juridica') {

            if (!response.cd_cooperativa) {

                for (var i = 0; i < inputs.length; i++) {

                    if (inputs[i].value == '') {
                        controlaNulo = 'true';
                    };
                }
            }

        } else {

            if (!response.cd_endereco) {

                for (var i = 0; i < inputs.length; i++) {

                    if (inputs[i].value == '') {
                        controlaNulo = 'true';
                    };
                }
            }

        }

        if (controlaNulo == 'true' && storageGoogle == 'true') {

            //Recupera os dados de ambos os perfis e seta no input
            document.getElementById("nm_usuario").value = response.usuario.nm_usuario;
            document.getElementById("sobrenome_usuario").value = response.usuario.sobrenome_usuario;
            document.getElementById("email").value = response.usuario.email;

            selectEstados.length = 0;
            optionEstado.innerHTML = 'Selecione seu estado';
            estado.appendChild(optionEstado);

            selectCidades.length = 0;
            optionCidade.innerHTML = 'Selecione sua cidade';
            cidade.appendChild(optionCidade);

        } else if (controlaNulo == 'true' && storageGoogle == 'false') {

            //Recupera os dados de ambos os perfis e seta no input
            document.getElementById("email").value = response.usuario.email;


            selectEstados.length = 0;
            optionEstado.innerHTML = 'Selecione seu estado';
            estado.appendChild(optionEstado);

            selectCidades.length = 0;
            optionCidade.innerHTML = 'Selecione sua cidade';
            cidade.appendChild(optionCidade);

        } else {

            //Recupera os dados de ambos os perfis e seta no input
            document.getElementById("nm_usuario").value = response.usuario.nm_usuario;
            document.getElementById("sobrenome_usuario").value = response.usuario.sobrenome_usuario;
            document.getElementById("email").value = response.usuario.email;
            document.getElementById("nascimento").value = response.usuario.dt_nascimento;
            document.getElementById("documento_principal").value = response.usuario.documento_principal;


            selectEstados.length = 0;
            optionEstado.innerHTML = 'Selecione seu estado';
            estado.appendChild(optionEstado);

            selectCidades.length = 0;
            optionCidade.innerHTML = 'Selecione sua cidade';
            cidade.appendChild(optionCidade);

            //Recupera os dados de pessoa juridica e seta no input
            if (storagePerfil == 'juridica') {

                document.getElementById("razaoSocial").value = response.usuario.cooperativa.razao_social;
                document.getElementById("cnpj").value = response.usuario.cooperativa.cnpj;
                document.getElementById("nm_logradouro").value = response.usuario.cooperativa.endereco.nm_logradouro;
                document.getElementById("numero").value = response.usuario.cooperativa.endereco.numero;
                document.getElementById("cep").value = response.usuario.cooperativa.endereco.cep;
                document.getElementById("nm_bairro").value = response.usuario.cooperativa.endereco.nm_bairro;


                selectEstados.length = 0;
                optionEstado.innerHTML = response.usuario.cooperativa.endereco.cidade.estado.nm_estado;
                estado.appendChild(optionEstado);

                selectCidades.length = 0;
                optionCidade.innerHTML = response.usuario.cooperativa.endereco.cidade.nm_cidade;
                cidade.appendChild(optionCidade);

            } else {

                document.getElementById("nm_logradouro").value = response.usuario.endereco.nm_logradouro;
                document.getElementById("numero").value = response.usuario.endereco.numero;
                document.getElementById("nm_complemento").value = response.usuario.endereco.nm_complemento;
                document.getElementById("cep").value = response.usuario.endereco.cep;
                document.getElementById("nm_bairro").value = response.usuario.endereco.nm_bairro;

                selectEstados.length = 0;
                optionEstado.innerHTML = response.usuario.endereco.cidade.estado.nm_estado;
                estado.appendChild(optionEstado);

                selectCidades.length = 0;
                optionCidade.innerHTML = response.usuario.endereco.cidade.nm_cidade;
                cidade.appendChild(optionCidade);

            }

        }

    })
    .catch(err => console.error(err));