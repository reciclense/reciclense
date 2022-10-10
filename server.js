const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
//const cookieParser = require('cooki-parser');
const cors = require('cors');

const tabelaEstado = require('./src/models/estado');
const tabelaCidade = require('./src/models/cidade');
const tabelaEndereco = require('./src/models/endereco');
const tabelaCooperativa = require('./src/models/cooperativa');
const tabelaColetor = require('./src/models/coletor');
const tabelaUsuario = require('./src/models/usuario');
const tabelaMaterial = require('./src/models/material');
const tabelaColeta = require('./src/models/coleta');

router.get('/', function (req, res) {

    res.sendFile(path.join(__dirname + '/index.html'));

});

app.use('/', router);
app.use(cors());
//app.use(cookieParser());
app.use(express.json());
app.listen(process.env.port || 3000);


