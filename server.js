const express = require('express');
const app = express();

const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./network/routes.js');
const config = require('./config.js');
const db = require('./db.js');

const user = encodeURIComponent(config.dbUser);
const password = encodeURIComponent(config.dbPassword);
const host = encodeURIComponent(config.dbHost);
const dataBase = encodeURIComponent(config.dbName);

db(`mongodb+srv://${user}:${password}@${host}/${dataBase}`);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

router(app);

app.use('/app', express.static('public'));


server.listen(3000, () => console.log('localhost:3000'));