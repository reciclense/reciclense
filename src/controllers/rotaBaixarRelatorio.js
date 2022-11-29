const fs = require('fs');

async function baixarRelatorio(req,res) {
    res.download('src/relatorios/COLETAS_29112022_19947.pdf');
}

module.exports = baixarRelatorio;