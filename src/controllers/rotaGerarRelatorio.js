/*Importações das tabelas*/
const tabelaUsuario = require('../migrations/usuario');
const tabelaColeta = require('../migrations/coleta');
const tabelaEndereco = require('../migrations/endereco');
const tabelaCidade = require('../migrations/cidade');
const tabelaEstado = require('../migrations/estado');
const tabelaMaterial = require('../migrations/material');
const tabelaCooperativa = require('../migrations/cooperativa');

/*Importação das bibliotecas*/
const pdf = require('html-pdf');
const ejs = require('ejs');
const sequelize = require('../migrations/db');


/*Pegando data e hora atual*/
var timeElapsed = Date.now();
var today = new Date(timeElapsed);
var data = today.toLocaleDateString().replace('/', '');
var dataFinal = data.replace('/', '');
var hora = today.getHours();
var min = today.getMinutes();
var sec = today.getSeconds();

/*configurações do pdf*/
const options = {
    format: 'Letter',
    orientation: "landscape",
    border: "0.2in"
};

/*Função para gerar o relatório*/
async function gerarRelatorio(req, res) {

    /*Capturando dados enviados pelo front*/
    let dados = req.body;

    /*Fazendo conversão da data para padrão Brasil*/
    let dtInicioFormatada = dados.dtInicio.split('-').reverse().join('/');
    let dtFimFormatada = dados.dtFim.split('-').reverse().join('/');

    /*Caso usuário não escolha um período específico*/
    if (dados.dtInicio == "" && dados.dtFim == "") {

        /*Pesquisa sem filtros*/
        if (dados.bairro == "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado`
                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }


            /*Pesquisa com filtro nos 4 campos*/
        } else if (dados.bairro != "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE m.nm_material = ` + `'` + dados.material + `'
                    AND e.nm_bairro = ` + `'` + dados.bairro + `'
                    AND cid.nm_cidade = ` + `'` + dados.cidade + `'`
                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {

                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }

            /*Pesquisa com filtro: bairro*/
        } else if (dados.bairro != "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE e.nm_bairro = ` + `'` + dados.bairro + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: bairro e material*/
        } else if (dados.bairro != "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE e.nm_bairro = ` + `'` + dados.bairro + `'
                    AND m.nm_material = ` + `'` + dados.material + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: bairro, material e estado*/
        } else if (dados.bairro != "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE e.nm_bairro = ` + `'` + dados.bairro + `'
                    AND m.nm_material = ` + `'` + dados.material + `'
                    AND est.sigla_uf = ` + `'` + dados.estado + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: bairro e estado e cidade*/
        } else if (dados.bairro != "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE e.nm_bairro = ` + `'` + dados.bairro + `'
                    AND est.sigla_uf = ` + `'` + dados.estado + `'
                    AND cid.nm_cidade = ` + `'` + dados.cidade + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: bairro e estados*/
        } else if (dados.bairro != "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE e.nm_bairro = ` + `'` + dados.bairro + `'
                    AND est.sigla_uf = ` + `'` + dados.estado + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: bairro e cidade*/
        } else if (dados.bairro != "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE e.nm_bairro = ` + `'` + dados.bairro + `'
                    AND cid.nm_cidade = ` + `'` + dados.cidade + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: material, estado e cidade*/
        } else if (dados.bairro == "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE est.sigla_uf = ` + `'` + dados.estado + `'
                    AND cid.nm_cidade = ` + `'` + dados.cidade + `'
                    AND m.nm_material = ` + `'` + dados.material + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: material e estado*/
        } else if (dados.bairro == "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE est.sigla_uf = ` + `'` + dados.estado + `'
                    AND m.nm_material = ` + `'` + dados.material + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: material e estado*/
        } else if (dados.bairro == "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE cid.nm_cidade = ` + `'` + dados.cidade + `'
                    AND m.nm_material = ` + `'` + dados.material + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: material*/
        } else if (dados.bairro == "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE m.nm_material = ` + `'` + dados.material + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: estado*/
        } else if (dados.bairro == "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE est.sigla_uf = ` + `'` + dados.estado + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: estado e cidade*/
        } else if (dados.bairro == "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE cid.nm_cidade = ` + `'` + dados.cidade + `'
                    AND est.sigla_uf = ` + `'` + dados.estado + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: cidade*/
        } else {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                    e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                    FROM coleta c 
                    INNER JOIN material m ON c.cd_material = m.cd_material
                    INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                    INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                    INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                    INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                    WHERE cid.nm_cidade = ` + `'` + dados.cidade + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
        }
        /*Caso usuário escolha um período específico*/
    } else {

        /*Pesquisa sem filtros*/
        if (dados.bairro == "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`
                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }


            /*Pesquisa com filtro nos 4 campos*/
        } else if (dados.bairro != "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE m.nm_material = ` + `'` + dados.material + `'
                            AND e.nm_bairro = ` + `'` + dados.bairro + `'
                            AND cid.nm_cidade = ` + `'` + dados.cidade + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`
                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {

                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }

            /*Pesquisa com filtro: bairro*/
        } else if (dados.bairro != "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE e.nm_bairro = ` + `'` + dados.bairro + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: bairro e material*/
        } else if (dados.bairro != "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE e.nm_bairro = ` + `'` + dados.bairro + `'
                            AND m.nm_material = ` + `'` + dados.material + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: bairro, material e estado*/
        } else if (dados.bairro != "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE e.nm_bairro = ` + `'` + dados.bairro + `'
                            AND m.nm_material = ` + `'` + dados.material + `'
                            AND est.sigla_uf = ` + `'` + dados.estado + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: bairro e estado e cidade*/
        } else if (dados.bairro != "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE e.nm_bairro = ` + `'` + dados.bairro + `'
                            AND est.sigla_uf = ` + `'` + dados.estado + `'
                            AND cid.nm_cidade = ` + `'` + dados.cidade + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: bairro e estados*/
        } else if (dados.bairro != "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE e.nm_bairro = ` + `'` + dados.bairro + `'
                            AND est.sigla_uf = ` + `'` + dados.estado + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: bairro e cidade*/
        } else if (dados.bairro != "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE e.nm_bairro = ` + `'` + dados.bairro + `'
                            AND cid.nm_cidade = ` + `'` + dados.cidade + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: material, estado e cidade*/
        } else if (dados.bairro == "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE est.sigla_uf = ` + `'` + dados.estado + `'
                            AND cid.nm_cidade = ` + `'` + dados.cidade + `'
                            AND m.nm_material = ` + `'` + dados.material + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: material e estado*/
        } else if (dados.bairro == "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE est.sigla_uf = ` + `'` + dados.estado + `'
                            AND m.nm_material = ` + `'` + dados.material + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: material e estado*/
        } else if (dados.bairro == "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE cid.nm_cidade = ` + `'` + dados.cidade + `'
                            AND m.nm_material = ` + `'` + dados.material + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: material*/
        } else if (dados.bairro == "Todos os bairros" && dados.material != "Todos os materiais" && dados.estado == "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE m.nm_material = ` + `'` + dados.material + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: estado*/
        } else if (dados.bairro == "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade == "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE est.sigla_uf = ` + `'` + dados.estado + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: estado e cidade*/
        } else if (dados.bairro == "Todos os bairros" && dados.material == "Todos os materiais" && dados.estado != "Todos os estados" && dados.cidade != "Todas as cidades") {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                            u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                            e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE cid.nm_cidade = ` + `'` + dados.cidade + `'
                            AND est.sigla_uf = ` + `'` + dados.estado + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            /*Pesquisa com filtro: cidade*/
        } else {

            try {

                const [results] = await sequelize.query(

                    `SELECT c.data, c.horario, c.observacao, m.nm_material, 
                    u.nm_usuario, e.cep, e.nm_bairro, e.nm_logradouro, 
                           e.numero, e.nm_complemento, cid.nm_cidade, est.sigla_uf
                            FROM coleta c 
                            INNER JOIN material m ON c.cd_material = m.cd_material
                            INNER JOIN usuario u ON c.cd_usuario = u.cd_usuario
                            INNER JOIN endereco e ON u.cd_endereco =  e.cd_endereco
                            INNER JOIN cidade cid ON e.cd_cidade = cid.cd_cidade
                            INNER JOIN estado est ON cid.cd_estado = est.cd_estado
                            WHERE cid.nm_cidade = ` + `'` + dados.cidade + `'
                            AND c.data BETWEEN '` + dados.dtInicio + `' AND '` + dados.dtFim + `'`

                );

                if (results != null) {

                    /*Passando dados para a página ejs*/
                    ejs.renderFile('src/ejs/templatePDF.ejs', {

                        dtInicio: dtInicioFormatada,
                        dtFim: dtFimFormatada,
                        dados: results

                    }, function (err, html) {

                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        } else {
                            /*Gerando relatório em pdf. Padrão seguido para geração do nome do arquivo: 'COLETAS_DDMMYYY_HHMMSS'*/
                            pdf.create(html, options).toFile('src/relatorios/COLETAS_' + dataFinal + '_' + hora + min + sec + '.pdf', function (error, response) {

                                if (error) {
                                    /*Não conseguiu gerar o pdf*/
                                    return res.status(400).json({
                                        success: false,
                                        message: error.message
                                    })

                                } else {
                                    /*Conseguiu gerar o pdf*/
                                    return res.status(200).json({
                                        success: true,
                                        pdf: response,
                                    })
                                }
                            });
                        }
                    })
                }

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
        }
    }
}

module.exports = gerarRelatorio;