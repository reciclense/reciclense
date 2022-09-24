const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
//const cookieParser = require('cooki-parser');
const cors = require('cors');

const testeTabela = require('./src/models/db');


router.get('/', function(req,res){

    res.sendFile(path.join(__dirname + '/index.html'));

});

app.use('/', router);
app.use(cors());
//app.use(cookieParser());
app.use(express.json());
app.listen(process.env.port || 3000);


