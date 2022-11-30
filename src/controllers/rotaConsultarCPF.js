const request = require("request");

async function consultarCPF(req, res) {

    let dados = req.body

    const args = {
        "cpf": dados.cpf,
        "birthdate": dados.birthdate,
        "origem": dados.origem,
        "token": dados.token,
        "timeout": 300
    };

    const options = {
        method: 'POST',
        url: 'https://api.infosimples.com/api/v2/consultas/receita-federal/cpf',
        form: args
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        parseResponse(JSON.parse(body));
    });

    function parseResponse(response) {


        if (response.code == 200) {

            return res.status(200).json({
                success: true,
                dados: response.data,
                header: response.header,
                comprovante: response.site_receipts
            });
            
        } else if (response.code >= 600 && response.code <= 799) {

            return res.status(400).json({
                success: false,
                messagem: 'Resultado sem sucesso. Leia para saber mais:' + response.errors.join("; "),
                code: response.code,
                code_messagem: response.code_messagem
            });
        }
    }
}

module.exports = consultarCPF;