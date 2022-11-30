// Recuperando o JSON das coletas através do método GET
const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } };

fetch('http://localhost:5500/listar-coletas', options)
    .then(response => response.json())
    .then(response => {

        // Dados para popular a tabela
        const dados = [];

        // Percorrendo o objeto response.dados e atribuindo um array dentro do array dados
        for (let i = 0; i < response.dados.length; i++) {
            dados[i] = [response.dados[i].material.nm_material, response.dados[i].usuario.endereco.nm_logradouro, response.dados[i].usuario.endereco.numero, response.dados[i].usuario.endereco.nm_bairro,
            response.dados[i].usuario.endereco.cidade.nm_cidade, response.dados[i].usuario.endereco.cidade.estado.nm_estado,
            response.dados[i].usuario.endereco.nm_complemento, response.dados[i].data.split('-').reverse().join('/'), response.dados[i].horario,
            response.dados[i].usuario.nm_usuario, response.dados[i].observacao]

        }

        // Função para criar uma Tag Ex: <tr>, <td>
        function criarTag(elemento) {
            return document.createElement(elemento);
        }

        // Criando a tabela
        let tabela = document.getElementById("tbl-pesquisa");
        let thead = criarTag("thead");
        let tbody = criarTag("tbody");

        let indicesTabela = ["Material", "Rua", "Numero", "Bairro", "Cidade", "Estado", "Complemento", "Data", "Horario", "Solicitante", "Observação"];
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
            tbody.appendChild(linhaBody);
        }

        // Atribuindo as tags da tabela na tag <table>
        tabela.appendChild(thead);
        tabela.appendChild(tbody);

    })
    .catch(err => console.error(err));

// Pesquisa dinâmica
document.getElementById("ipt-pesquisa").addEventListener("keyup", function () {

    let tbody = document.querySelector('tbody')
    let busca = document.getElementById("ipt-pesquisa").value.toLowerCase();

    // Percorrendo as do body para encontrar um valor
    for (let i = 0; i < tbody.childNodes.length; i++) {

        let achou = false;
        let tr = tbody.childNodes[i];
        let td = tr.childNodes;

        // Percorrendo as colunas do body para encontrar um valor
        for (let j = 0; j < td.length; j++) {
            let value = td[j].childNodes[0].nodeValue.toLowerCase();

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