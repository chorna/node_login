const express = require('express');
const response = require('../../network/response.js');
const controller = require('./controller.js');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('login', {error: ''});
});

router.post('/', function (req, res) {
    const { username, password } = req.body;
    controller.login(username, password)
        .then((user) => res.redirect(`user/edit-profile/${user.username}`))
        .catch(err => res.render('login', { error: 'No se pudo iniciar sesión. Verifica tus credenciales.'}))
});

module.exports = router;