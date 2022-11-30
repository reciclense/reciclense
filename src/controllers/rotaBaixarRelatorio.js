async function baixarRelatorio(req, res) {

    let nomePDF = req.params.pdf

    res.download('src/relatorios/' + nomePDF);

}

module.exports = baixarRelatorio;