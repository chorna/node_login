const Model = require('./model.js');

addUser = (user) => {
    const myuser = new Model(user);
    myuser.save();
};

module.exports = {
    add: addUser
}