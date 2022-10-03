
function handleCredentialResponse(response) {
    
    //console.log("Encoded JWT ID token: " + response.credential);
  }

  window.onload = function () {

    google.accounts.id.initialize({
      client_id: "867729017939-642nou49o83i1ki66tmqj62md7683ind.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("btnLoginGoogle"),
      { theme: "filled_black", 
      size:"medium", 
      type:"standard",
      shape:"rectangular",

      locale:"pt-BR",
      logo_alignment:"left"
 
    });

    //google.accounts.id.prompt(); // also display the One Tap dialog

  }

