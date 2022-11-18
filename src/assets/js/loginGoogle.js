/*Login Google*/
function handleCredentialResponse(response) {

  /*Descriptografando objeto respota do gmail*/
  const data = jwt_decode(response.credential);

  /*Salvando valores do json em constantes*/
  const email = data.email;
  const senha = data.sub;
  const nome = data.given_name;
  const sobrenome = data.family_name;

  /*Criando variaveis de controle*/
  let primeiroAcesso = false;
  let perfil = null;

  /*Função para definir qual é o tipo de perfil do usuário*/
  const salvaTipoPerfil = async () => {

    const storageIdUsuario = localStorage.getItem('id_usuario');

    /*Apresentando inputOptions*/
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          'fisica': 'Pessoa Fisíca',
          'juridica': 'Pessoa Jurídica'
        })
      }, 1000)
    })

    const { value: tp_perfil } = await Swal.fire({
      title: 'Escolha um tipo de perfil',
      input: 'radio',
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return 'Favor escolher um tipo de perfil!'
        }
      }
    })

    /*Armazenando o tipo de perfil escolhido na variavel perfil*/
    if (tp_perfil != null) {

      perfil = tp_perfil;

      /*Chamando rota para atualizar o tipo de perfil do usuário*/
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          perfil
        })
      };

      fetch('http://localhost:5500/salvar-tipo-perfil', options)
        .then(response => response.json())
        .then(response => {

          /*Salvando perfil do usuario no localStorage*/
          localStorage.setItem("perfil", perfil);
        })
        .catch(err => console.error(err));

    } else {

      while (perfil == null) {

        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Favor escolher um tipo de perfil!',

          showDenyButton: true,
          confirmButtonText: 'Escolher',
          denyButtonText: 'Cancelar'
        }).then(async (result) => {

          console.log("RESULTADO: " + result);

          //Caso o usuario clique em escolher chama o metodo novamente
          if (result.isConfirmed) {

            await salvaTipoPerfil();

          } else {

            const options = {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: storageIdUsuario,
                perfil: null
              })
            };

            fetch('http://localhost:5500/excluir-usuario', options)
              .then(response => response.json())
              .then(async response => {
                if (response.success) {
                  perfil = 1;
                  window.location.href = '/index.html';
                }
              }).catch(err => console.error(err));
          }
        });
      }
    }
  }

  /*Requisição para cadastrar usuario google na base*/
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      senha,
      nome,
      sobrenome,
      perfil
    })
  };

  fetch('http://localhost:5500/usuario-google', options)
    .then(response => response.json())
    .then(async response => {

      if (response.existeUsuario) {

        if (response.success == false) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuário ou senha incorreta!'
          });

        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          })

          await Toast.fire({
            icon: 'success',
            title: 'Logado com sucesso'
          })

          //Salvando token no localStorage
          localStorage.setItem("token", response.token);
          localStorage.setItem("id_usuario", response.id_usuario);
          localStorage.setItem("perfil", response.tp_perfil);
          localStorage.setItem("google", true);

          if (response.tp_perfil == 'fisica') {
            window.location.href = "src/pages/pessoaFisicaPrincipal.html";
          } else {
            window.location.href = "src/pages/pessoaJuridicaPrincipal.html";
          }

        }

      } else {

        localStorage.setItem("id_usuario", response.id_usuario);

        primeiroAcesso = true;

        /*Caso seja o primeiro acesso com gmail entra*/
        if (primeiroAcesso) {

          /*Chama função para definir o tipo de perfil do usuario*/
          await salvaTipoPerfil();

        }

        if (response.success == false) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuário ou senha incorreta!'
          });

        } else {

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          })

          await Toast.fire({
            icon: 'success',
            title: 'Logado com sucesso'
          })

          /*Salvando token, id do usuario e item para saber se o usuairo logou com o gmail no localStorage*/
          localStorage.setItem("token", response.token);
          localStorage.setItem("id_usuario", response.id_usuario);
          localStorage.setItem("google", 'true');

          if (perfil == 'fisica') {
            window.location.href = "src/pages/pessoaFisicaPrincipal.html";
          } else {
            window.location.href = "src/pages/pessoaJuridicaPrincipal.html";
          }
        }
      }
    })
    .catch(err => console.error(err));
}

window.onload = function () {

  google.accounts.id.initialize({
    client_id: "867729017939-642nou49o83i1ki66tmqj62md7683ind.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  /*Criação do botão do google*/
  google.accounts.id.renderButton(
    document.getElementById("btnLoginGoogle"),
    {
      theme: "outline",
      size: "medium",
      type: "standard",
      shape: "rectangular",
      locale: "pt-BR",
      logo_alignment: "left"
    });
}