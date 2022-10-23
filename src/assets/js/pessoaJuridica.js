//Dados para popular a tabela
const dados = [ ['Av Caxangá', 'Recife', 'Pernambuco', 'Metal', 'Everton'],
                ['Av Caxangá', 'Recife', 'Pernambuco', 'Papel', 'Magnum'],
                ['Av Caxangá', 'Recife', 'Pernambuco', 'Plástico', 'Vinicius']
]

function criarTag(elemento) {
    return document.createElement(elemento);
}

let tabela = document.getElementById("tbl-pesquisa");

let thead = criarTag("thead");
let tbody = criarTag("tbody");
let tfoot = criarTag("tfoot");

let indicesTabela = ["Endereço", "Cidade", "Estado", "Material", "Solicitante"];
let linhaHead = criarTag("tr");

function criarCelula(tag, text) {
    tag = criarTag(tag);
    tag.textContent = text;
    return tag;
}

for(let j = 0; j < indicesTabela.length; j++){
    let th = criarCelula("th", indicesTabela[j]);
    linhaHead.appendChild(th);
}
thead.appendChild(linhaHead);

for (let j = 0, linhaBody = ''; j < dados.length; j++) {
    //console.log(dados[j]);
    linhaBody = criarTag("tr")
    for(let i = 0, cel = ''; i < dados[j].length; i++){
        //console.log(dados[j][i]);
        cel = criarCelula("td", dados[j][i]);
        linhaBody.appendChild(cel);
    }
    tbody.appendChild(linhaBody);
}

tabela.appendChild(thead);
tabela.appendChild(tbody);
tabela.appendChild(tfoot);




/*
//Popular tabela
let tbody = document.getElementById("tbody");
for (let i = 0; i < dados.length; i++) {
    let tr = "<tr>" +
    "<td>" + dados[i][0] + "</td>" +
    "<td>" + dados[i][1] + "</td>" +
    "<td>" + dados[i][2] + "</td>" +
    "<td>" + dados[i][3] + "</td>" +
    "<td>" + dados[i][4] + "</td>" +
    "</tr>";
    tbody.innerHTML += tr;

}

//Barra de pesquisa
document.getElementById("ipt-pesquisa").addEventListener("keyup", function () {
    
    let busca = document.getElementById("ipt-pesquisa").value.toLowerCase();

    for (let i = 1; i < tbody.childNodes.length; i++) { 
        console.log(tbody.childNodes)
        let achou = false;
        let tr = tbody.childNodes[i];
        let td = tr.childNodes;
        console.log(tr)
        for (let j = 0; j < td.length; j++) {
            let value = td[j].childNodes[0].nodeValue.toLowerCase();


            if (value.indexOf(busca) >= 0) {
                achou = true;
            }
        }

        if (achou) {
            tr.style.display = "table-row";
        } else {
            tr.style.display = "none";
        }
    }

});

*/