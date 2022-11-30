const tabelaUsuario = require('../migrations/usuario');
const tabelaEndereco = require('../migrations/endereco');
const tabelaColeta = require('../migrations/coleta');
const tabelaCooperativa = require('../migrations/cooperativa');
const tabelaColetor = require('../migrations/coletor');

async function excluirUsuario(req, res) {

    let dados = req.body;
    var enderecoUsuario = null;
    var cooperativaUsuario = null;

    const usuario = await tabelaUsuario.findOne({

        where: {
            cd_usuario: dados.id
        }
    });

    if (usuario == null) {

        return res.status(400).json({
            success: false
        });
    } else {

        if (dados.perfil == 'fisica') {

            await tabelaColeta.destroy({
                where: {
                    cd_usuario: usuario.cd_usuario
                }
            }).then(async function () {

                enderecoUsuario = usuario.cd_endereco;

                await tabelaUsuario.destroy({
                    where: {
                        cd_usuario: usuario.cd_usuario
                    }
                }).then(async function () {

                    await tabelaEndereco.destroy({
                        where: {
                            cd_endereco: enderecoUsuario
                        }
                    }).then(async function () {

                        return res.status(200).json({
                            success: true
                        });
                    }).catch(function (error) {

                        return res.status(400).json({
                            success: false,
                            messagem: error.message
                        });
                    });
                }).catch(function (error) {

                    return res.status(400).json({
                        success: false,
                        messagem: error.message
                    });
                });

            }).catch(function (error) {

                return res.status(400).json({
                    success: false,
                    messagem: error.message
                });
            });

        } else if(dados.perfil == 'juridica'){

            const cooperativa = await tabelaCooperativa.findOne({

                where: {
                    cd_cooperativa: usuario.cd_cooperativa
                }
            });

            if (cooperativa == null) {

                return res.status(400).json({
                    success: false,
                    messagem: error.message
                });

            } else {

                await tabelaColetor.destroy({
                    where: {
                        cd_cooperativa: cooperativa.cd_cooperativa
                    }
                }).then(async function () {

                    cooperativaUsuario = usuario.cd_cooperativa;
                    enderecoUsuario = usuario.cd_endereco;

                    await tabelaUsuario.destroy({
                        where: {
                            cd_usuario: usuario.cd_usuario
                        }
                    }).then(async function () {

                        let cooperativaEndereco = cooperativa.cd_endereco;

                        await tabelaCooperativa.destroy({
                            where: {
                                cd_cooperativa: usuario.cd_cooperativa
                            }
                        }).then(async function () {

                            await tabelaEndereco.destroy({
                                where: {
                                    cd_endereco: cooperativaEndereco
                                }
                            }).then(async function () {

                                return res.status(200).json({
                                    success: true
                                });
                            }).catch(function (error) {

                                return res.status(400).json({
                                    success: false,
                                    messagem: error.message
                                });
                            });

                        }).catch(function (error) {
 
                            return res.status(400).json({
                                success: false,
                                messagem: error.message
                            });
                        });

                    }).catch(function (error) {

                        return res.status(400).json({
                            success: false,
                            messagem: error.message
                        });
                    });

                }).catch(function (error) {

                    return res.status(400).json({
                        success: false,
                        messagem: error.message
                    });
                });
            }
            //Caso o perfil esteja nulo ( Acontece ao tentar logar com o google pela primeira vez e desistir antes de escolher o tp_perfil)
        }else{

            await tabelaUsuario.destroy({
                where: {
                    cd_usuario: usuario.cd_usuario
                }
            }).then(function(){

                return res.status(200).json({
                    success: true
                });
            }).catch (function (error){

                return res.status(400).json({
                    success: false,
                    messagem: error.message
                });
            });

        }

    }
}

module.exports = excluirUsuario;