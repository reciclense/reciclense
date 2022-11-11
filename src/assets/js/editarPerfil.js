var inputs = document.getElementsByClassName("inputsPerfil");

//Função para habilitar campos do perfil ao clicar no botão editar
document.getElementById('btnEditarPerfil')
    .addEventListener('click', function () {

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeAttribute("disabled");
        }

    });

//Função para desabilitar campos do perfil ao clicar no botão salvar
document.getElementById('btnSalvarPerfil')
    .addEventListener('click', function () {

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute("disabled", '');
        }

    });