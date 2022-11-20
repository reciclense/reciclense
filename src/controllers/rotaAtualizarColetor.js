const tabelaColetor = require('../migrations/coletor');

async function atualizarColetor(req, res) {

    //Recurepando dados do formulario
    let dados = req.body;

    //Verificando se o coletor existe na tabela
    await tabelaColetor.findOne({

        where: {
            documento_principal: dados.cpfAtual
        }
    }).then(async function (usuario) {

        if (usuario != null) {

            //Atualizando tabela coletor
            await tabelaColetor.update({
                nm_coletor: dados.nm_coletor,
                sobrenome_coletor: dados.sobrenome_coletor
            },
                {
                    where: {
                        documento_principal: dados.cpfAtual
                    }

                }).then(function () {
                    return res.status(200).json({
                        success: true
                    });
                }).catch(function (erro) {
                    return res.status(400).json({
                        success: false,
                        messagem: erro.message
                    });
                });

        } else {
            res.status(400).json({
                success: false,
                messagem: "Coletor não encontrado"
            });
        }

    }).catch(function (erro) {
        return res.status(400).json({
            success: false,
            messagem: erro.message
        });
    });



}

module.exports = atualizarColetor;