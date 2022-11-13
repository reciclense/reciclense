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
        console.log('ENTROU: Não achou o usuario');
        return res.status(400).json({
            success: false
        });
    } else {
        console.log('ENTROU: cd_cooperativa: ' + usuario.cd_cooperativa + ' cd_endereco: ' + usuario.cd_endereco);
        if (dados.perfil == 'fisica') {

            await tabelaColeta.destroy({
                where: {
                    cd_usuario: usuario.cd_usuario
                }
            }).then(async function () {
                console.log('FISICA: Excluiu a coleta');

                enderecoUsuario = usuario.cd_endereco;

                console.log('FISICA: salvou o endereco do usuario: ' + enderecoUsuario);
                await tabelaUsuario.destroy({
                    where: {
                        cd_usuario: usuario.cd_usuario
                    }
                }).then(async function () {
                    console.log('FISICA: Excluiu o usuario');
                    await tabelaEndereco.destroy({
                        where: {
                            cd_endereco: enderecoUsuario
                        }
                    }).then(async function () {
                        console.log('FISICA: Excluiu o endereco');
                        return res.status(200).json({
                            success: true
                        });
                    }).catch(function (error) {
                        console.log('FISICA: Não excluiu o endereco. cd_endereco: ' + usuario.cd_endereco);
                        return res.status(400).json({
                            success: false,
                            messagem: error.message
                        });
                    });
                }).catch(function (error) {
                    console.log('FISICA: Não excluiu o usuario: ' + usuario.cd_usuario);
                    return res.status(400).json({
                        success: false,
                        messagem: error.message
                    });
                });

            }).catch(function (error) {
                console.log('FISICA: Não excluiu as coletas');
                return res.status(400).json({
                    success: false,
                    messagem: error.message
                });
            });

        } else {

            const cooperativa = await tabelaCooperativa.findOne({

                where: {
                    cd_cooperativa: usuario.cd_cooperativa
                }
            });

            if (cooperativa == null) {
                console.log('JURIDICA: Não encontrou a cooperativa. cd_cooperativa: ' + cooperativa.cd_cooperativa);
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
                    console.log('JURIDICA: Excluiu o coletor');

                    cooperativaUsuario = usuario.cd_cooperativa;
                    enderecoUsuario = usuario.cd_endereco;

                    console.log('JURIDICA: salvou a cooperativa do usuario: ' + cooperativaUsuario);

                    await tabelaUsuario.destroy({
                        where: {
                            cd_usuario: usuario.cd_usuario
                        }
                    }).then(async function () {
                        console.log('JURIDICA: Excluiu o usuario');

                        let cooperativaEndereco = cooperativa.cd_endereco;
                        console.log('JURIDICA: salvou o endereco da cooperativa: ' + cooperativaEndereco);
                        await tabelaCooperativa.destroy({
                            where: {
                                cd_cooperativa: usuario.cd_cooperativa
                            }
                        }).then(async function () {
                            console.log('JURIDICA: Excluiu a cooperativa');
                            await tabelaEndereco.destroy({
                                where: {
                                    cd_endereco: cooperativaEndereco
                                }
                            }).then(async function () {
                                console.log('JURIDICA: Excluiu o endereco: ');
                                return res.status(200).json({
                                    success: true
                                });
                            }).catch(function (error) {
                                console.log('JURIDICA: Não excluiu o endereco. cd_endereco: ' + enderecoUsuario);
                                return res.status(400).json({
                                    success: false,
                                    messagem: error.message
                                });
                            });

                        }).catch(function (error) {
                            console.log('JURIDICA: Não excluiu a cooperativa. cd_cooperativa: ' + cooperativaUsuario);
                            return res.status(400).json({
                                success: false,
                                messagem: error.message
                            });
                        });

                    }).catch(function (error) {
                        console.log('JURIDICA: Não excluiu o usuario: ' + usuario.cd_usuario);
                        return res.status(400).json({
                            success: false,
                            messagem: error.message
                        });
                    });

                }).catch(function (error) {
                    console.log('JURIDICA: Não excluiu o coletor. cd_cooperativa: ' + cooperativa.cd_cooperativa);
                    return res.status(400).json({
                        success: false,
                        messagem: error.message
                    });
                });
            }
        }

    }
}

module.exports = excluirUsuario;