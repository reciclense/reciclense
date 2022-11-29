const tabelaColeta = require('../migrations/coleta');

async function atualizarColeta(req, res) {

    //Recurepando dados do formulario
    let dados = req.body;

    //Verificando se a coleta existe na tabela
    await tabelaColeta.findOne({

        where: {
            cd_coleta: dados.cd_coleta
        }
    }).then(async function (coleta) {

        if (coleta != null) {

            //Atualizando tabela coletor
            await tabelaColeta.update({
                data: dados.data,
                horario: dados.horario,
                observacao: dados.observacao,
                cd_material: dados.cd_material
            },
                {
                    where: {
                        cd_coleta: dados.cd_coleta
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

module.exports = atualizarColeta;