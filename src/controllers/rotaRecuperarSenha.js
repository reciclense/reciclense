const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('../config/smtp');
const tabelaUsuario = require('../migrations/usuario');

async function recuperarSenha(req, res) {

    let dados = req.body;

    // Verificando se email ja existe na tabela de Usuários
    await tabelaUsuario.findOne({

        attributes: ['nm_usuario'],
        where: {
            email: dados.email
        }

    }).then(async function (usuario) {

        //Criando e conectando transportador de email com o gmail 
        const transporter = nodemailer.createTransport({

            host: SMTP_CONFIG.host,
            port: SMTP_CONFIG.port,
            secure: false,
            auth: {
                user: SMTP_CONFIG.user,
                pass: SMTP_CONFIG.pass,
            },
            tls: {
                rejectUnauthorized: false
            },
        });

        const emailEnviado = await transporter.sendMail({
            from: 'Suporte Reciclense <testereciclense@gmail.com>',
            subject: 'RECUPERAR SENHA - RECICLENSE',
            to: dados.email,
            text: 'Olá ' + usuario.nm_usuario + '. Você fez um pedido de recuperação de senha? Para poder recuperar a sua senha, por favor clique no link: http://localhost:5500/src/pages/redefinirSenha.html',
            html: `
        <div style="margin-left:30%;margin-right:20px;margin-top:24px">
            <tbody>
                <tr>
                    <td style="font-size:14px;line-height:21px;padding:0;text-align:left;vertical-align:top;color:#8e8e8e;font-family:'PT Sans','Trebuchet MS',sans-serif" width="600">
                        <div style="margin-left:20px;margin-right:20px;margin-top:24px">
                            <div style="line-height:20px;font-size:1px">&nbsp;</div>
                        </div>
                        <div style="margin-left:20px;margin-right:20px">
                            <h1 style="margin-top:0;margin-bottom:20px;font-style:normal;font-weight:normal;font-size:26px;line-height:34px;color:#2f353e;font-family:'PT Serif',Georgia,serif;text-align:center"><img class="CToWUd" src="i.imgur.com/1VhnVyv.png" alt="" data-bit="iit" width="258" height="163"></h1>
                            <h3 style="margin-top:0;margin-bottom:20px;font-style:normal;font-weight:normal;font-size:14px;line-height:34px;color:#2f353e;font-family:'PT Serif',Georgia,serif;text-align:center"><strong>Recuperar senha</strong></h3>
                        </div>
                        <div style="margin-left:20px;margin-right:20px;margin-bottom:24px">
                            <p>Olá ` + usuario.nm_usuario  + `. Você fez um pedido de recuperação de senha?</p>
                            <p>Para poder recuperar a sua senha, por favor clique no botão abaixo.</p>
                            <p style="margin-top:0;margin-bottom:0;font-size:16px;line-height:24px">&nbsp;&nbsp;</p>
                            <p style="margin-top:0;margin-bottom:0;font-size:16px;line-height:24px">&nbsp;</p>
                            <p style="margin-top:0px;margin-bottom:0px;font-size:16px;line-height:24px;text-align:center"><span style="font-weight:400"><a style="border-radius:4px;display:inline-block;font-weight:bold;text-align:center;text-decoration:none!important;color:#fff;background-color:#d30a12;font-family:'PT Sans','Trebuchet MS',sans-serif;font-size:12px;line-height:24px;padding:12px 35px" href="http://localhost:5500/src/pages/redefinirSenha.html" target="_blank" data-saferedirecturl="http://localhost:5500/src/pages/redefinirSenha.html">RECUPERAR SENHA</a>&nbsp;</span></p>
                            <p style="margin-top:0;margin-bottom:0;font-size:16px;line-height:24px">&nbsp;</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </div>
            `
        }).then(function () {
            return res.status(200).json({
                success: true
            })
        }).catch(function (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        })

        console.log('EMAIL ENVIADO: ' + emailEnviado);

    }).catch(function (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    });
}

module.exports = recuperarSenha;