let inputs = document.getElementsByClassName("inputsPerfil");
let botoes = document.getElementsByClassName("botoesPerfil");
let perfil = localStorage.getItem('perfil');

//Função para habilitar campos do perfil ao clicar no botão editar
document.getElementById('btnEditarPerfil')
    .addEventListener('click', function () {

        if (perfil == 'juridica') {

            for (let i = 0; i < inputs.length; i++) {

                if (inputs[i].id == "nm_usuario" || inputs[i].id == "sobrenome_usuario" || inputs[i].id == "nascimento"
                    || inputs[i].id == "documento_principal" || inputs[i].id == "cnpj" || inputs[i].id =='nome-coletor' || inputs[i].id == 'sobrenome-coletor') {

                    inputs[i].removeAttribute("disabled");
                    inputs[i].setAttribute("required", '');
                }
            }

        } else {

            for (let i = 0; i < inputs.length; i++) {

                if (inputs[i].id != "email" && inputs[i].id != "nm_estado" && inputs[i].id != "nm_cidade" && inputs[i].id != "nm_logradouro" && inputs[i].id != "nm_bairro") {
                    inputs[i].removeAttribute("disabled");
                    inputs[i].setAttribute("required", '');
                }
            }

        }

        for (let i = 0; i < botoes.length; i++) {
            botoes[i].removeAttribute("hidden");
        }

    });