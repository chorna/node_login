const express = require('express');
const response = require('../../network/response.js');
const controller = require('./controller.js');
const router = express.Router();

router.get('/register', function (req, res) {
    res.render('register', {error: ''})
});

router.post('/register', function (req, res) {
    const { first_name, last_name, username, email, password } = req.body;
    controller.addUser(username, password, first_name, last_name, email)
        .then((user) => res.redirect(`/login`))
        .catch(err => res.render('register', {error: 'Error: Usuario registrado'}))

});

router.get('/edit-profile/:username', (req, res) => {
    const username = req.params.username;
    if (username) {
        controller.getUser(username)
            .then((user) => {
                res.render('profile', { user: user, successMessage: '',  errorMessage: ''})
            })
            .catch()
    }
});

router.post('/edit-profile/:username', (req, res) => {
    const { first_name, last_name, email, username, password } = req.body;
    controller.updateUser(first_name, last_name, email, username, password)
        .then((response) => {
            res.render('profile', {
                user: response.user,
                successMessage: response.successMessage,
                errorMessage: response.errorMessage
            })
        })
        .catch(err => res.render('profile', { successMessage: '', errorMessage: 'Error', user: '' }))

});


module.exports = router;