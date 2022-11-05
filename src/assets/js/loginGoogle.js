//import * as Sequelize from 'sequelize';
//import * as tabelaUsuario from '/src/models/usuario.js';

/*Login Google*/
 function handleCredentialResponse(response) {

  const data = jwt_decode(response.credential);

  const email = data.email;
  const senha = data.sub;
  const nome = data.given_name;
  const sobrenome = data.family_name;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      senha,
      nome,
      sobrenome
    })
  };

  fetch('http://localhost:5500/usuario-google', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  /*console.log('Usuário salvo com sucesso! Usuário: ' + usuario);
  console.log('Erro ao salvar usuário: ' + error);
  
  fullName.textContent = data.name;
  verifiedEmail.textContent = data.email_verified;
  picture.setAttribute("src", data.picture);*/
  // window.location.href = "http://127.0.0.1:5500/src/pages/pessoaJuridicaPrincipal.html";

}

window.onload = function () {

  google.accounts.id.initialize({
    client_id: "867729017939-642nou49o83i1ki66tmqj62md7683ind.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

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