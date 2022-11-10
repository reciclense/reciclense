/*Login Google*/
function handleCredentialResponse(response) {

  /*Descriptografando objeto respota do gmail*/
  const data = jwt_decode(response.credential);

  const email = data.email;
  const senha = data.sub;
  const nome = data.given_name;
  const sobrenome = data.family_name;
  let perfil = null;

  /*Função para definir qual é o tipo de perfil do usuário*/
  const salvaTipoPerfil = async () => {

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
    perfil = tp_perfil;
  }

  /*Requisição para verificar se o email já existe*/
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email
    })
  };

  fetch('http://localhost:5500/busca-usuario-google', options)
    .then(response => response.json())
    .then(async response => {

      /*Caso não seja o chama a rota de validar login */
      if (response.existeUsuario) {

        //Configuração da rota
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            senha
          })
        };

        //Fetch para redirecionar usuário de acordo com o tp_perfil ou apresentar alert 
        fetch('http://localhost:5500/valida-login', options)
          .then(response => response.json())
          .then(async response => {
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
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              await Toast.fire({
                icon: 'success',
                title: 'Logado com sucesso'
              })

              //Salvando token no localStorage
              localStorage.setItem("token", response.token);

              if (response.tp_perfil == 'fisica') {
                window.location.href = "src/pages/pessoaFisicaPrincipal.html";
              } else {
                window.location.href = "src/pages/pessoaJuridicaPrincipal.html";
              }
            }
          })
          .catch(err => console.error(err));

        /*Caso seja o primeiro acesso cadastra as informações na base*/
      } else {

        /*Chama função para definir o tipo de perfil do usuario*/
        await salvaTipoPerfil();

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
          .then(response => {

            if (response.success) {

              //Configuração da rota
              const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email,
                  senha
                })
              };

              //Fetch para redirecionar usuário de acordo com o tp_perfil ou apresentar alert 
              fetch('http://localhost:5500/valida-login', options)
                .then(response => response.json())
                .then(async response => {
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
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })

                    await Toast.fire({
                      icon: 'success',
                      title: 'Logado com sucesso'
                    })

                    //Salvando token no localStorage
                    localStorage.setItem("token", response.token);

                    if (response.tp_perfil == 'fisica') {
                      window.location.href = "src/pages/pessoaFisicaPrincipal.html";
                    } else {
                      window.location.href = "src/pages/pessoaJuridicaPrincipal.html";
                    }
                  }
                })
                .catch(err => console.error(err));
            }
          })
          .catch(err => console.error(err));
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