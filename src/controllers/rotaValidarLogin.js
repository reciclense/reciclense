/*Configurações*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const acessoToken = "D587SCF4712TESC930WYZS4G52UMLOP51ZA56611A";

/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');

/*Função para validar login*/
  async function validarLogin(req, res) {

    let dados = req.body;

    const usuario = await tabelaUsuario.findOne({
        attributes: ['cd_usuario', 'email', 'senha', 'nm_usuario', 'tp_perfil'],
        where: {
            email: dados.email
        }
    });

    if (usuario == null) {

        return res.status(400).json({
            success: false
        });

    } else {

        if (await bcrypt.compare(dados.senha, usuario.senha)) {

            let token = jwt.sign({ id: usuario.cd_usuario }, acessoToken, {
                expiresIn: 1800 //30min
            });

            return res.status(200).json({
                success: true,
                id_usuario: usuario.cd_usuario,
                tp_perfil: usuario.tp_perfil,
                token
            });

        } else {

            return res.status(400).json({
                success: false
            });

        }
    }

}

module.exports = validarLogin;