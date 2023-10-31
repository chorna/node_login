const user = require('../components/user/network.js');

const routes = (server) => {
    server.use('/user', user);
}

module.exports = routes;