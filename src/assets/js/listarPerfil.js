//Armazena o id do usuario gerado na constante
const storageIdUsuario = localStorage.getItem("id_usuario");

const nm_usuario = document.getElementById("nm_usuario");
const sobrenome_usuario = document.getElementById("sobrenome_usuario");
const email = document.getElementById("email");
const documento_principal = document.getElementById("documento_principal");
const nm_logradouro = document.getElementById("nm_logradouro");
const numero = document.getElementById("numero");
const nm_complemento = document.getElementById("nm_complemento");
const cep = document.getElementById("cep");
const nm_cidade = document.getElementById("nm_cidade");
const nm_estado = document.getElementById("nm_estado");

const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};

//Configuração da rota
fetch('http://localhost:5500/listar-perfil/' + storageIdUsuario, options)
    .then(response => response.json())
    .then(response => {

        nm_usuario.value = response.usuario.nm_usuario;
        sobrenome_usuario.value = response.usuario.sobrenome_usuario;
        email.value = response.usuario.email;
        documento_principal.value = response.usuario.documento_principal;
        nm_logradouro.value = response.usuario.endereco.nm_logradouro;
        numero.value = response.usuario.endereco.numero;
        nm_complemento.value = response.usuario.endereco.nm_complemento;
        cep.value = response.usuario.endereco.cep;
        nm_cidade.value = response.usuario.endereco.cidade.nm_cidade;
        nm_estado.value = response.usuario.endereco.cidade.estado.nm_estado;

    })
    .catch(err => console.error(err));