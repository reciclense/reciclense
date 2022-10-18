//import * as Sequelize from 'sequelize';
//import * as tabelaUsuario from '/src/models/usuario.js';

/*Login Google*/
 function handleCredentialResponse(response) {

  const data = jwt_decode(response.credential);
  const tabelaUsuario = require('./src/models/usuario');

  const usuario =  tabelaUsuario.create({

      email: data.email,
      senha: data.sub,
      nm_usuario: data.given_name,
      sobrenome_usuario: data.family_name

  }).then(function () {
      console.log('Usuário salvo com sucesso! Usuário: ' + usuario);
  }).catch(function (error) {
      console.log('Erro ao salvar usuário: ' + error);
  });

  /*fullName.textContent = data.name;
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