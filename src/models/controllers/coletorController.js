const { Router } = require('express')

const tabelaColetor = require('../coletor');

module.exports = {

    async buscaColetor(req, res) {

        try{

            const cpf = req.body

            const coletor = tabelaColetor.findAll({
                where: {
                    cd_coletor: 1
                }
            });

            req.status(400).json({coletor})

        }catch{
            req.status(400).json({message: "Deu erro"})
        }
        


    }

}