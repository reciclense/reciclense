var inputs = document.getElementsByClassName("inputsPerfil");
var botoes = document.getElementsByClassName("botoesPerfil");

//Função para habilitar campos do perfil ao clicar no botão editar
document.getElementById('btnEditarPerfil')
    .addEventListener('click', function () {

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeAttribute("disabled");
        }

        for (var i = 0; i < botoes.length; i++) {
            botoes[i].removeAttribute("hidden");
        }

    });

/*Função para desabilitar campos do perfil ao clicar no botão salvar
document.getElementById('btnSalvarPerfil')
    .addEventListener('click', function () {

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute("disabled", '');
        }

        for (var i = 0; i < botoes.length; i++) {
            botoes[i].setAttribute("hidden", '');
        }

    });*/