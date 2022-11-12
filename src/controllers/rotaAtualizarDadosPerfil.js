const tabelaUsuario = require('../migrations/usuario');
const tabelaEndereco = require('../migrations/endereco');
const tabelaCidade = require('../migrations/cidade');
const tabelaEstado = require('../migrations/estado');
const tabelaCooperativa = require('../migrations/cooperativa');

async function atualizarDadosPerfil(req, res) {

    //Recurepando dados do formulario
    let dados = req.body;

    //Buscando na base estado informado pelo usuario
    await tabelaEstado.findOne({

        attributes: ['cd_estado'],

        where: {
            nm_estado: dados.estado
        }
        //Caso encontre o estado busca a cidade
    }).then(async function (estado) {

        // Buscando na base cidade inforamada pelo usuario
        await tabelaCidade.findOne({

            attributes: ['cd_cidade'],

            where: {
                nm_cidade: dados.cidade
            }
        }).then(async function (cidade) {

            //Buscando na base usuario pelo id (Informação salva no localStorage)
            await tabelaUsuario.findOne({

                attributes: ['cd_endereco', 'cd_cooperativa'],

                where: {
                    cd_usuario: dados.id
                }
                //Caso encontre o usuario entra
            }).then(async function (usuario) {

                //Caso o cd_endereco ou cd_cooperativa não seja nulo significa o perfil ja foi atualizado antes e entra no if
                if (usuario.cd_endereco != null || usuario.cd_cooperativa != null) {

                    console.log('ENTROU: Pre query para atualizar o endereço');
                    //Caso seja perfil pessoa fisíca atualiza o endereco e o usuário
                    console.log("Perfil: " + dados.perfil);
                    if (dados.perfil == 'fisica') {
                        console.log('ENTROU: Em pessoa Fisica');
                        //Atualizando tabela endereco
                        console.log('ENTROU: Inseriu o endereço. CEP: ' + dados.cep + 
                        ' BAIRRO: ' + dados.bairro + 
                        ' RUA: ' + dados.rua + 
                        ' NUMERO: ' + dados.numero +
                            ' COMPLEMENTO: ' + dados.complemento + 
                            " CIDADE: " + cidade.cd_cidade + 
                            " ESTADO: " + estado.cd_estado + 
                            "USUARIO ENDERECO: " + usuario.cd_endereco);

                        await tabelaEndereco.update({

                            cep: dados.cep,
                            nm_bairro: dados.bairro,
                            nm_logradouro: dados.rua,
                            numero: dados.numero,
                            nm_complemento: dados.complemento,
                            cd_cidade: cidade.cd_cidade,
                            cd_estado: estado.cd_estado
                        },
                            {
                                where: {
                                    cd_endereco: usuario.cd_endereco
                                }
                                //Caso consiga atualizar o endereco atualiza o usuario
                            }).then(async function () {

                                //Atualizando tabela usuario
                                await tabelaUsuario.update({

                                    nm_usuario: dados.nome,
                                    sobrenome_usuario: dados.sobrenome,
                                    documento_principal: dados.cpf,
                                    cd_endereco: dados.cd_endereco
                                },

                                    {
                                        where: {
                                            cd_usuario: dados.id
                                        }
                                        //Caso consiga atualizar o usuario retorna success = true
                                    }).then(function () {
                                        console.log('ENTROU: Atualizou pessoa fisica');
                                        return res.status(200).json({
                                            success: true
                                        });
                                        //Caso nao consiga atualizar o usuario retorna success = false
                                    }).catch(function (error) {

                                        return res.status(400).json({
                                            success: false,
                                            perfil: dados.perfil,
                                            message: error.message
                                        });
                                    });
                                //Caso não consiga atualizar o endereço retorna success = false
                            }).catch(function (error) {
                                console.log("não conseguiu atualizar endereço");
                                return res.status(400).json({
                                    success: false,
                                    perfil: dados.perfil,
                                    message: error.message
                                });
                            });
                        //Caso seja pessoa juridica atualiza o endereco da cooperativa e depois atualiza o usuario
                    } else {

                        //Busca cooperativa na base
                        await tabelaCooperativa.findOne({
                            where: {
                                cd_cooperativa: usuario.cd_cooperativa
                            }
                            //Caso ache a cooperativa atualiza o endereco
                        }).then(async function (cooperativa) {

                            //Atualizando o endereço da cooperativa
                            await tabelaEndereco.update({

                                cep: dados.cep,
                                nm_bairro: dados.bairro,
                                nm_logradouro: dados.rua,
                                numero: dados.numero,
                                nm_complemento: dados.complemento,
                                cd_cidade: cidade.cd_cidade,
                                cd_estado: estado.cd_estado
                            },
                                {
                                    where: {
                                        cd_endereco: cooperativa.cd_endereco
                                    }
                                    //Caso consiga atualizar o endereço atualiza o usuario
                                }).then(async function () {

                                    //Atualizando o usuario
                                    await tabelaUsuario.update({

                                        nm_usuario: dados.nome,
                                        sobrenome_usuario: dados.sobrenome,
                                        documento_principal: dados.cpf,
                                        cd_cooperativa: cooperativa.cd_cooperativa
                                    },
                                        {
                                            where: {
                                                cd_usuario: dados.id
                                            }
                                            //Caso consiga atualizar o usuario retorna success = true
                                        }).then(function () {
                                            return res.status(200).json({
                                                success: true
                                            });
                                            //Caso nao consiga atualizar o usuario retorna success = false
                                        }).catch(function (error) {
                                            return res.status(400).json({
                                                success: false,
                                                perfil: dados.perfil,
                                                message: error.message
                                            });
                                        });
                                    //Caso não consiga atualizar o endereço retorna success = false
                                }).catch(function (error) {
                                    return res.status(400).json({
                                        success: false,
                                        perfil: dados.perfil,
                                        message: error.message
                                    });
                                });
                            //Caso não consiga achar a cooperativa retorna success = false
                        }).catch(async function (error) {
                            return res.status(400).json({
                                success: false,
                                perfil: dados.perfil,
                                message: error.message
                            });
                        });
                    }
                    //Perfil esta sendo atualizado pela 1° vez
                } else {

                    console.log('ENTROU: Pre query para criar endereço');
                    //Caso seja perfil pessoa fisíca cria o endereco e  atualiza o usuário
                    if (dados.perfil == 'fisica') {

                        //Criando o endereço na base
                        await tabelaEndereco.create({

                            cep: dados.cep,
                            nm_bairro: dados.bairro,
                            nm_logradouro: dados.rua,
                            numero: dados.numero,
                            nm_complemento: dados.complemento,
                            cd_cidade: cidade.cd_cidade,
                            cd_estado: estado.cd_estado

                            //Caso consiga criar o endereco atualiza o usuario
                        }).then(async function (endereco) {

                            console.log('ENTROU: Pre atualizar dados do usuario pessoa fisica');

                            //Atualizando usuario
                            await tabelaUsuario.update({
                                nm_usuario: dados.nome,
                                sobrenome_usuario: dados.sobrenome,
                                documento_principal: dados.cpf,
                                cd_endereco: endereco.cd_endereco
                            },

                                {
                                    where: {
                                        cd_usuario: dados.id
                                    }
                                    //Caso consiga atualizar o usuario retorna success = true
                                }).then(function () {
                                    console.log('ENTROU: Atualizou pessoa fisica');
                                    return res.status(200).json({
                                        success: true
                                    });
                                    //Caso nao consiga atualizar o usuario retorna success = false
                                }).catch(function (error) {
                                    return res.status(400).json({
                                        success: false,
                                        perfil: dados.perfil,
                                        message: error.message
                                    });
                                });
                            //Caso não consiga criar o endereço retorna success = false
                        }).catch(function (error) {
                            return res.status(400).json({
                                success: false,
                                perfil: dados.perfil,
                                message: error.message
                            });
                        });
                        //Entra caso seja pessoa juridica
                    } else {

                        //Busca cooperativa na base
                        await tabelaCooperativa.findOne({
                            where: {
                                cnpj: dados.cnpj
                            }
                            //Caso encontre a cooperativa atualiza o endereço
                        }).then(async function (cooperativa) {

                            //Atualizando endereço da cooperativa
                            await tabelaEndereco.update({

                                cep: dados.cep,
                                nm_bairro: dados.bairro,
                                nm_logradouro: dados.rua,
                                numero: dados.numero,
                                nm_complemento: dados.complemento,
                                cd_cidade: cidade.cd_cidade,
                                cd_estado: estado.cd_estado
                            },
                                {
                                    where: {
                                        cd_endereco: endereco.cd_endereco
                                    }
                                    //Se conseguir atualizar o endereço atualiza o usuario
                                }).then(async function () {

                                    //Atualizando usuario
                                    await tabelaUsuario.update({

                                        nm_usuario: dados.nome,
                                        sobrenome_usuario: dados.sobrenome,
                                        documento_principal: dados.cpf,
                                        cd_cooperativa: cooperativa.cd_cooperativa
                                    },
                                        {
                                            where: {
                                                cd_usuario: dados.id
                                            }
                                            //Caso consiga atualizar o usuario retorna success = true
                                        }).then(function () {
                                            return res.status(200).json({
                                                success: true
                                            });
                                            //Caso nao consiga atualizar o usuario retorna success = false
                                        }).catch(function (error) {
                                            return res.status(400).json({
                                                success: false,
                                                perfil: dados.perfil,
                                                message: error.message
                                            });
                                        });
                                    //Caso não consiga atualizar o endereço retorna success = false
                                }).catch(function () {
                                    return res.status(400).json({
                                        success: false,
                                        perfil: dados.perfil,
                                        message: error.message
                                    });
                                });
                            //Caso a cooperativa nao exista cria o endereço, a cooperativa e atualiza o usuario
                        }).catch(async function () {

                            //Criando o endereço da cooperativa na base
                            await tabelaEndereco.create({

                                cep: dados.cep,
                                nm_bairro: dados.bairro,
                                nm_logradouro: dados.rua,
                                numero: dados.numero,
                                nm_complemento: dados.complemento,
                                cd_cidade: cidade.cd_cidade,
                                cd_estado: estado.cd_estado

                                //Caso consiga criar o endereço cria a cooperativa
                            }).then(async function (endereco) {

                                //Criando cooperativa na base
                                await tabelaCooperativa.create({

                                    razao_social: dados.razaoSocial,
                                    cnpj: dados.cnpj,
                                    cd_endereco: endereco.cd_endereco

                                    //Caso consiga criar a cooperativa atualiza o usuario
                                }).then(async function (cooperativa) {

                                    //Atualizando o usuario
                                    await tabelaUsuario.update({

                                        nm_usuario: dados.nome,
                                        sobrenome_usuario: dados.sobrenome,
                                        documento_principal: dados.cpf,
                                        cd_cooperativa: cooperativa.cd_cooperativa
                                    },
                                        {
                                            where: {
                                                cd_usuario: dados.id
                                            }
                                            //Caso consiga atualizar o usuario retorna success = true
                                        }).then(function () {
                                            return res.status(200).json({
                                                success: true
                                            });
                                            //Caso nao consiga atualizar o usuario retorna success = false
                                        }).catch(function (error) {
                                            return res.status(400).json({
                                                success: false,
                                                perfil: dados.perfil,
                                                message: error.message
                                            });
                                        });
                                    //Caso não consiga criar a cooperativa retorna success = false
                                }).catch(function (error) {
                                    return res.status(400).json({
                                        success: false,
                                        perfil: dados.perfil,
                                        message: error.message
                                    });
                                });
                                //Caso não consiga criar o endereço retorna success = false
                            }).catch(function (error) {
                                return res.status(400).json({
                                    success: false,
                                    perfil: dados.perfil,
                                    message: error.message
                                });
                            });
                        });
                    }
                }
                //Caso nao encontre o usuario retorna success = false
            }).catch(async function (error) {
                return res.status(400).json({
                    success: false,
                    perfil: dados.perfil,
                    message: error.message
                });
            });
            //Caso nao encontre a cidade retorna success = false
        }).catch(function (error) {
            return res.status(400).json({
                success: false,
                perfil: dados.perfil,
                message: error.message
            });
        });
        //Caso nao encontre o estado retorna success = false
    }).catch(function (error) {
        return res.status(400).json({
            success: false,
            perfil: dados.perfil,
            message: error.message
        });
    });
}

module.exports = atualizarDadosPerfil;