const store = require('../user/store');
const bcrypt = require('bcrypt')

login = (username, password) => {
    return new Promise(async (resolve, reject) => {
        if (!username || !password) {
            return reject('Datos incorrectos');
        }

        const user = await store.get(username)

        if (!user) {
            return reject('Usuario no encontrado');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return resolve(user);
        } else {
            return reject('Contraseña incorrecta');
        }
    });
};

module.exports = {
    login
}