/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');
const tabelaEndereco = require('../migrations/endereco');
const tabelaCidade = require('../migrations/cidade');
const tabelaEstado = require('../migrations/estado');
const tabelaCooperativa = require('../migrations/cooperativa');
const tabelaColetor = require('../migrations/coletor');

/*Função para cadastrar coletor*/
async function cadastrarColetor(req, res) {

    //Recurepando dados do formulario
    let dados = req.body;

    //Verificando se o coletor ja existe na tabela
    const coletor = await tabelaColetor.findOne({
        attributes: ['documento_principal'],
        where: {
            documento_principal: dados.documento_principal
        }

    });

    //Caso o coletor ja exista na tabela
    if (coletor != null) {
        return res.status(400).json({
            success: false,
            messagem: " Usuário já cadastrado"
        })
    } else {

        //Buscando na base a cooperativa da pessoa juridica que está cadastrando
        await tabelaUsuario.findOne({
            attributes: ['cd_cooperativa'],
            where: {
                cd_usuario: dados.id_juridico
            }
        }).then(async function (usuario) {

            //Cadastrando o coletor na tabela
            await tabelaColetor.create({
                nm_coletor: dados.nm_coletor,
                sobrenome_coletor: dados.sobrenome_coletor,
                dt_nascimento: dados.dt_nascimento,
                documento_principal: dados.documento_principal,
                cd_cooperativa: usuario.cd_cooperativa
            }).then(function (coletor) {

                return res.status(200).json({
                    success: true,
                    dados: coletor
                })
            }).catch(function (erro) {
                return res.status(400).json({
                    success: false,
                    messagem: erro.messagem
                })
            })

        }).catch(function (erro) {
            return res.status(400).json({
                success: false,
                messagem: erro.messagem
            })
        })
    }
}

module.exports = cadastrarColetor;