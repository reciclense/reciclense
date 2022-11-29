const tabelaColeta = require('../migrations/coleta');

async function excluirColeta(req, res) {

    //Recurepando dados do formulario
    let dados = req.body;

    //Verificando se o coletor existe na tabela
    await tabelaColeta.findOne({

        where: {
            cd_coleta: dados.cd_coleta,
            cd_usuario: dados.cd_usuario
        }
    }).then(async function (coleta) {

        if (coleta != null) {

            //Atualizando tabela coletor
            await tabelaColeta.destroy({
                    where: {
                        cd_coleta: dados.cd_coleta
                    }

                }).then(function () {
                    console.log("COLETA EXCLUIDA COM SUCESSO")
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
                messagem: "Coleta não encontrada"
            });
        }

    }).catch(function (erro) {
        return res.status(400).json({
            success: false,
            messagem: erro.message
        });
    });



}

module.exports = excluirColeta;