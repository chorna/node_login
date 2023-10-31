const store = require('./store');
const bcrypt = require('bcrypt')

addUser = (username, password, first_name, last_name, email) => {
    return new Promise((resolve, reject) => {
        if (!username || !password) {
            return reject('Datos incorrectos');
        }

        const saltRounds = 5;

        const submitPassword = password

        bcrypt.hash(submitPassword, saltRounds, (err, hash) => {
            if (err) {
                console.error('Error al encriptar la contraseña:', err);
            } else {
                const fulluser = {
                    username: username,
                    password: hash,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                };

                store.add(fulluser);
                resolve(fulluser)
            }
        });

    });
};



module.exports = {
    addUser
}