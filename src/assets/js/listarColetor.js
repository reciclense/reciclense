//Recuperando valores id_usuario e perfil do localStorage
const storageIdUsuario = localStorage.getItem('id_usuario');

// Recuperando o JSON das coletas através do método GET
const options = { method: 'GET' };

fetch('http://localhost:5500/listar-coletor/' + storageIdUsuario, options)
    .then(response => response.json())
    .then(response => {

        // Dados para popular a tabela
        const dados = [];

        // Percorrendo o objeto response.dados e atribuindo um array dentro do array dados
        for (let i = 0; i < response.dados.length; i++) {
            dados[i] = [response.dados[i].nm_coletor, response.dados[i].sobrenome_coletor,
            response.dados[i].dt_nascimento, response.dados[i].documento_principal]

        }

        console.log(dados);

        // Função para criar uma Tag Ex: <tr>, <td>
        function criarTag(elemento) {
            return document.createElement(elemento);
        }

        // Criando a tabela
        let tabela = document.getElementById("tableGerenciaUsuario");
        let thead = criarTag("thead");
        let tbody = criarTag("tbody");

        let indicesTabela = ["Nome", "Sobrenome", "Nascimento", "CPF", "Ações"];
        let linhaHead = criarTag("tr");

        // Função para criar uma celula Ex <th> + o texto
        function criarCelula(tag, text) {
            tag = criarTag(tag);
            tag.textContent = text;
            return tag;
        }



        // Percorrendo o indice das tabelas e atribuindo a tag <thead>
        for (let j = 0; j < indicesTabela.length; j++) {
            let th = criarCelula("th", indicesTabela[j]);
            linhaHead.appendChild(th);
        }
        thead.appendChild(linhaHead);

        // Percorrendo os dados e atribuindo as colunas e adicionando em cada linha
        for (let j = 0, linhaBody = ''; j < dados.length; j++) {

            linhaBody = criarTag("tr");
            if (j % 2 != 0) {
                linhaBody.setAttribute("class", "table-active");
            }

            for (let i = 0, cel = ''; i < dados[j].length; i++) {
                cel = criarCelula("td", dados[j][i]);
                linhaBody.appendChild(cel);
            }

            // Criando o botão Editar
            let btnEditar = document.createElement('button');
            btnEditar.type = 'button';
            btnEditar.innerHTML = 'Editar';
            btnEditar.className = 'btn btn-secondary i bi-pencil-square';
            btnEditar.setAttribute('data-bs-toggle', 'modal');
            btnEditar.setAttribute('data-bs-target', '#formEditaColetor');
            btnEditar.setAttribute('onclick', "editarColetor(" + "'" + dados[j][0] + "'," + "'" + dados[j][1] + "'," + "'" + dados[j][2] + "'" + "," + "'" + dados[j][3] + "'" + ")");

            //Criando mais uma celula no final da linha e adicionando o botão Editar
            let editar = linhaBody.insertCell();
            editar.appendChild(btnEditar);
            tbody.appendChild(linhaBody);
        }

        // Atribuindo as tags da tabela na tag <table>
        tabela.appendChild(thead);
        tabela.appendChild(tbody);

    }).catch(err => console.error(err));

// Pesquisa dinâmica
document.getElementById("iptPesquisarColetor").addEventListener("keyup", function () {

    let tbody = document.querySelector('tbody')
    let busca = document.getElementById("iptPesquisarColetor").value.toLowerCase();
    console.log(busca);

    // Percorrendo as do body para encontrar um valor
    for (let i = 0; i < tbody.childNodes.length; i++) {

        let achou = false;
        let tr = tbody.childNodes[i];
        let td = tr.childNodes;

        // Percorrendo as colunas do body para encontrar um valor
        for (let j = 0; j < 3; j++) {
            let value = td[j].childNodes[0].nodeValue.toLowerCase();
            console.log(td.length)
            console.log(td)

            if (value.indexOf(busca) >= 0) {
                achou = true;
            }
        }

        // Se encontrar, adicionar a classe "table-row" para exibir as linhas da pesquisa
        if (achou) {
            tr.style.display = "table-row";
        }
        // Se não encontrar, adicionar a classe "none" para esconder as linhas
        else {
            tr.style.display = "none";
        }
    }

});