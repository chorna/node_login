const store = require('./store');

addUser = (username, password, first_name, last_name, email) => {
    return new Promise((resolve, reject) => {
        if (!username || !password) {
            return reject('Datos incorrectos');
        }

        const fulluser = {
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            email: email,
        };

        store.add(fulluser);
        resolve(fulluser)

    });
};



module.exports = {
    addUser
}