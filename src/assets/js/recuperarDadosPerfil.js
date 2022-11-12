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
        let controlaNulo = false;

        if (storagePerfil == 'juridica') {

            if (!response.cd_cooperativa) {

                //Desabilitando campos do formulario novamente
                for (var i = 0; i < inputs.length; i++) {

                    if (inputs[i].value == '') {
                        controlaNulo = true;
                    };
                }
            }

        } else {

            if (!response.cd_endereco) {

                //Desabilitando campos do formulario novamente
                for (var i = 0; i < inputs.length; i++) {

                    if (inputs[i].value == '') {
                        controlaNulo = true;
                    };
                }
            }

        }

        if (controlaNulo && storageGoogle == true) {

            //Recupera os dados de ambos os perfis e seta no input
            document.getElementById("nm_usuario").value = response.usuario.nm_usuario;
            document.getElementById("sobrenome_usuario").value = response.usuario.sobrenome_usuario;
            document.getElementById("email").value = response.usuario.email;

        } else if (controlaNulo && storageGoogle != true) {

            //Recupera os dados de ambos os perfis e seta no input
            document.getElementById("email").value = response.usuario.email;

        } else {

            //Recupera os dados de ambos os perfis e seta no input
            document.getElementById("nm_usuario").value = response.usuario.nm_usuario;
            document.getElementById("sobrenome_usuario").value = response.usuario.sobrenome_usuario;
            document.getElementById("email").value = response.usuario.email;
            document.getElementById("documento_principal").value = response.usuario.documento_principal;

            //Recupera os dados de pessoa juridica e seta no input
            if (storagePerfil == 'juridica') {

                document.getElementById("razaoSocial").value = response.usuario.cooperativa.razao_social;
                document.getElementById("cnpj").value = response.usuario.cooperativa.cnpj;
                document.getElementById("nm_logradouro").value = response.usuario.cooperativa.endereco.nm_logradouro;
                document.getElementById("numero").value = response.usuario.cooperativa.endereco.numero;
                document.getElementById("nm_complemento").value = response.usuario.cooperativa.endereco.nm_complemento;
                document.getElementById("cep").value = response.usuario.cooperativa.endereco.cep;
                document.getElementById("nm_bairro").value = response.usuario.cooperativa.endereco.nm_bairro;
                document.getElementById("nm_cidade").value = response.usuario.cooperativa.endereco.cidade.nm_cidade;
                document.getElementById("nm_estado").value = response.usuario.cooperativa.endereco.cidade.estado.nm_estado;

            } else {

                document.getElementById("nm_logradouro").value = response.usuario.endereco.nm_logradouro;
                document.getElementById("numero").value = response.usuario.endereco.numero;
                document.getElementById("nm_complemento").value = response.usuario.endereco.nm_complemento;
                document.getElementById("cep").value = response.usuario.endereco.cep;
                document.getElementById("nm_bairro").value = response.usuario.endereco.nm_bairro;
                document.getElementById("nm_cidade").value = response.usuario.endereco.cidade.nm_cidade;
                document.getElementById("nm_estado").value = response.usuario.endereco.cidade.estado.nm_estado;

            }

        }

    })
    .catch(err => console.error(err));