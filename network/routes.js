const user = require('../components/user/network.js');
const login = require('../components/login/network.js');

const routes = (server) => {
    server.use('/user', user);
    server.use('/login', login);
}

module.exports = routes;