/*Importação das tabelas*/
const tabelaColeta = require('../migrations/coleta');
const tabelaEndereco = require('../migrations/endereco');
const tabelaCidade = require('../migrations/cidade');
const tabelaEstado = require('../migrations/estado');
const tabelaCooperativa = require('../migrations/cooperativa');
const tabelaColetor = require('../migrations/coletor');

/*Função para cadastrar coletor*/
async function cadastrarColeta(req, res) {

    //Recurepando dados do formulario
    let dados = req.body;

    //Cadastrando a coleta na tabela
    await tabelaColeta.create({
        data: dados.data,
        horario: dados.horario,
        observacao: dados.observacao,
        cd_material: dados.material,
        cd_usuario: dados.usuario
    }).then(function (coleta) {

        return res.status(200).json({
            success: true,
            dados: coleta
        })
    }).catch(function (erro) {
        return res.status(400).json({
            success: false,
            messagem: erro.messagem
        })
    })
};

module.exports = cadastrarColeta;