//Recuperando valores id_usuario e perfil do localStorage
const storageIdUsuario = localStorage.getItem('id_usuario');

const options = { method: 'GET' };

fetch('http://localhost:5500/listar-minhas-coletas/' + storageIdUsuario, options)
    .then(response => response.json())
    .then(response => {

        // Dados para popular a tabela
        const coletas = response.dados;

        const listContainer = document.querySelector("#list");

        function listarMinhasColetas(coletas) {

            let list = '';

            if (coletas.length < 0) {
                list += `<div id="no-coletas">Nenhuma coleta disponível</div>`;
            } else {
                coletas.forEach((coletas, index) => {
                    list += `
            <div class="col">
                <div class="cardMinhasSolicitacoes card""> 
                            <div class="card-header d-flex align-items-center justify-content-center">
                                <h5 class="card-title">${coletas.material.nm_material}</h5>
                            </div>
                            <div class="card-body">
                                <label><b>Data:</b> ${coletas.data}</label><br><br>
                                <label><b>Horário:</b> ${coletas.horario} a.m</label><br><br>
                                <label><b>Observações:</b> ${coletas.observacao}</label><br><br>
                                <p class="card-text">Este é um exemplo de solicitação de coleta</p>
                                <a href="#" class="btn btn-sencondary">Editar</a>
                                <a href="#" class="btnExcluir btn btn-danger">Excluir</a>
                            </div>
                        </div>
                </div>`;
                })
            }

            listContainer.innerHTML = list;

        }

        listarMinhasColetas(coletas);

    })
    .catch(err => console.error(err));