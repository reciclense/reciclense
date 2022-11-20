/*Importação das tabelas*/
const tabelaColetor = require('../migrations/coletor');
const tabelaUsuario = require('../migrations/usuario');


/*Função para listar os coletores da cooperativa*/
async function listarColetor(req, res) {

    //Buscando na base a cooperativa da pessoa juridica que está cadastrando
    await tabelaUsuario.findOne({
        attributes: ['cd_cooperativa'],
        where: {
            cd_usuario: req.params.id
        }
    }).then( async function(usuario) {

        //Buscando todos os coletores na base onde a cooperativa é igual a da pessoa juridica
        await tabelaColetor.findAll({
            attributes: ['nm_coletor', 'sobrenome_coletor', 'dt_nascimento', 'documento_principal'],
            where: {
                cd_cooperativa: usuario.cd_cooperativa
            }
            
        }).then(function (coletores) {
            return res.status(200).json({
                success: true,
                dados: coletores
            });
        }).catch(function (erro) {
            return res.status(400).json({
                success: false,
                messagem: erro.message
            });
        });

    }).catch(function (erro) {
        return res.status(400).json({
            success: false,
            messagem: erro.message
        });
    });



    

}

module.exports = listarColetor;