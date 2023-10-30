const express = require('express');
const app = express();

const server = require('http').Server(app);

app.get('/', (req, res) => {
    res.send('Landing');
});

server.listen(3000, () => console.log('localhost:3000'));