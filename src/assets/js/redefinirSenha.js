document.getElementById('mostrarSenha')
.addEventListener('click', function(){

    const checkBox = document.getElementById('cadSenha');

    if(checkBox.type == 'password'){
        
        document.getElementById('cadSenha').type = 'text';
        document.getElementById('cadConfirmaSenha').type = 'text';
        
        controleClique = 1;

    }else{

        document.getElementById('cadSenha').type = 'password';
        document.getElementById('cadConfirmaSenha').type = 'password';
        

    }


});