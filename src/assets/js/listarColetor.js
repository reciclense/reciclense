
let btnEditar = document.createElement('button');
btnEditar.type = 'button';
btnEditar.innerHTML = 'Editar';
btnEditar.className = 'btn btn-secondary i bi-pencil-square';


const dados = [['João', 'da Silva', '777.222.333.444'], ['José', 'de Lima', '755.666.888.999'],
['Vinicius', 'Lima', '755.666.888.999'], ['Magnum', 'Silva', '755.666.888.999'],
['Everton', 'Hickley', '755.666.888.999']];

console.log(dados);

// Função para criar uma Tag Ex: <tr>, <td>
function criarTag(elemento) {
    return document.createElement(elemento);
}

// Criando a tabela
let tabela = document.getElementById("tableGerenciaUsuario");
let thead = criarTag("thead");
let tbody = criarTag("tbody");

let indicesTabela = ["Nome", "Sobrenome", "CPF", "Ações"];
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
    btnEditar.setAttribute('onclick', "editarColetor(" + "'" +dados[j][0]  +"'," + "'" + dados[j][1] + "'," + "'" + dados[j][2] + "'" + ")");

    //Criando mais uma celula no final da linha e adicionando o botão Editar
    let editar = linhaBody.insertCell();
    editar.appendChild(btnEditar);
    tbody.appendChild(linhaBody);
}

// Atribuindo as tags da tabela na tag <table>
tabela.appendChild(thead);
tabela.appendChild(tbody);