//Configurações
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
//const cookieParser = require('cooki-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

//Importação das Tabelas
const models = require('./src/models/models');

//Importação das rotas
const rotas = require('./src/routes/routes');

//Configurações
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/")));

router.get('/', function (req, res) {

    res.sendFile(path.join(__dirname + '/index.html'));

});

router.get('/baixar-relatorio', function (req, res) {

    res.download('src/relatorios/COLETAS_29112022_19947.pdf');

});

app.use('/', router);
app.use(rotas);
app.use(cors());
//app.use(cookieParser());
app.use(express.json());
app.listen(process.env.port || 5500);

