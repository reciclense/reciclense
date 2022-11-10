let btnEditarPerfil = document.getElementById('btnEditarPerfil');

const nm_usuario1 = document.getElementById("nm_usuario");
const sobrenome_usuario1 = document.getElementById("sobrenome_usuario");
const email1 = document.getElementById("email");
const documento_principal1 = document.getElementById("documento_principal");
const nm_logradouro1 = document.getElementById("nm_logradouro");
const numero1 = document.getElementById("numero");
const nm_complemento1 = document.getElementById("nm_complemento");
const cep1 = document.getElementById("cep");
const nm_cidade1 = document.getElementById("nm_cidade");
const nm_estado1 = document.getElementById("nm_estado");

btnEditarPerfil.addEventListener('click', function () {
    nm_usuario1.removeAttribute("disabled");
    sobrenome_usuario1.removeAttribute("disabled");
    email1.removeAttribute("disabled");
    documento_principal1.removeAttribute("disabled");
    nm_logradouro1.removeAttribute("disabled");
    numero1.removeAttribute("disabled");
    nm_complemento1.removeAttribute("disabled");
    cep1.removeAttribute("disabled");
    nm_cidade1.removeAttribute("disabled");
    nm_estado1.removeAttribute("disabled");

});