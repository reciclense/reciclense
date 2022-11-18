let inputs = document.getElementsByClassName("inputsPerfil");
let botoes = document.getElementsByClassName("botoesPerfil");

//Função para habilitar campos do perfil ao clicar no botão editar
document.getElementById('btnEditarPerfil')
    .addEventListener('click', function () {

        for (let i = 0; i < inputs.length; i++) {

            if (inputs[i].id != "email" && inputs[i].id != "nm_estado" && inputs[i].id != "nm_cidade" && inputs[i].id != "nm_logradouro" && inputs[i].id != "nm_bairro") {
                inputs[i].removeAttribute("disabled");
                inputs[i].setAttribute("required", '');
            }
        }

        for (let i = 0; i < botoes.length; i++) {
            botoes[i].removeAttribute("hidden");
        }

    });