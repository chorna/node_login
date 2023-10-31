const express = require('express');
const response = require('../../network/response.js');
const controller = require('./controller.js');
const router = express.Router();

router.get('/register', function (req, res) {
    res.sendFile('public/templates/register.html', { root: __dirname + '/../../' });
});

router.post('/register', function (req, res) {
    const { first_name, last_name, username, email, password } = req.body;
    controller.addUser(username, password, first_name, last_name, email)
        .then((user) => response.success(req, res, user, 201))
        .catch(err => response.error(req, res, 'Invalid data', 400))

});


module.exports = router;