
/*Login Google*/
function handleCredentialResponse(response) {

    const data = jwt_decode(response.credential);
    console.log(data);
    window.location.href="http://127.0.0.1:5500/src/pages/pessoaJuridicaPrincipal.html";
    /*fullName.textContent = data.name;
    sub.textContent = data.sub;
    given_name.textContent = data.given_name;
    family_name.textContent = data.family_name;
    email.textContent = data.email;
    verifiedEmail.textContent = data.email_verified;
    picture.setAttribute("src", data.picture);*/


  }

  window.onload = function () {

    google.accounts.id.initialize({
      client_id: "867729017939-642nou49o83i1ki66tmqj62md7683ind.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("btnLoginGoogle"),
      { theme: "outline", 
      size:"medium", 
      type:"standard",
      shape:"rectangular",
      locale:"pt-BR",
      logo_alignment:"left"
    });
  }