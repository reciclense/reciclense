/*Importação das tabelas*/

const sequelize = require('../migrations/db');

/*Função para listar coletas*/
async function recuperarBairros(req, res) {

    const [results] = await sequelize.query(

        `SELECT DISTINCT(e.nm_bairro)
         FROM coleta c INNER JOIN usuario u on c.cd_usuario = u.cd_usuario
         INNER JOIN endereco e on u.cd_endereco = e.cd_endereco`

    );

    if (results != null) {
        return res.status(200).json({
            success: true,
            bairros: results
        });
    } else {
        return res.status(400).json({
            success: false,
            messagem: erro.message
        });
    }
}

module.exports = recuperarBairros;