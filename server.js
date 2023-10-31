const express = require('express');
const app = express();

const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./network/routes.js');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

router(app);

app.use('/app', express.static('public'));


server.listen(3000, () => console.log('localhost:3000'));