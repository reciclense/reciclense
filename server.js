//Constantes
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
//const cookieParser = require('cooki-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

//Importação das Tabelas
const tabelaEstado = require('./src/models/estado');
const tabelaCidade = require('./src/models/cidade');
const tabelaEndereco = require('./src/models/endereco');
const tabelaCooperativa = require('./src/models/cooperativa');
const tabelaColetor = require('./src/models/coletor');
const tabelaUsuario = require('./src/models/usuario');
const tabelaMaterial = require('./src/models/material');
const tabelaColeta = require('./src/models/coleta');

//Importação das rotas
const rotasUsuario = require('./src/routes/rotasUsuario');

//Configurações
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/")));

router.get('/', function (req, res) {

    res.sendFile(path.join(__dirname + '/index.html'));

});

app.use('/', router);
app.use('/usuario', rotasUsuario);
app.use(cors());
//app.use(cookieParser());
app.use(express.json());
app.listen(process.env.port || 5500);

