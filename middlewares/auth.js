const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {

    eAdmin: async function (req, res, next) {

        //Armazenando o token + bearer
        const authHeader = req.headers.authorization;

        //Caso esteja nulo retorna status de erro
        if (!authHeader) {
            return res.status(400).json({
                success: false
            });
        }

        //Splitando o token para retirar o bearer
        const [, token] = authHeader.split(' ');

        //Caso esteja nulo retorna status de erro
        if (!token) {
            return res.status(400).json({
                success: false
            });
        }

        try {
            const decode = await promisify(jwt.verify)(token, "D587SCF4712TESC930WYZS4G52UMLOP51ZA56611A");
            req.userId = decode.id;
            next();

        } catch (error) {
            return res.status(400).json({
                success: false
            });
        }


    }
}
