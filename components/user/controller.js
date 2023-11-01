const store = require('./store');
const bcrypt = require('bcrypt')

addUser = (username, password, password2, first_name, last_name, email) => {
    return new Promise((resolve, reject) => {
        if (!username || !password || !password2) {
            reject('Datos incorrectos');
        }

        if (password != password2){
            reject('Las contraseñas no coinciden')
        }

        if (password.length <= 6) {
            reject('La contraseña debe tener como mínimo 6 caracteres')
        }

        const saltRounds = 5;

        const submitPassword = password

        bcrypt.hash(submitPassword, saltRounds, async (err, hash) => {
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

                const checkUser = await store.check(username)

                if (!checkUser){
                    store.add(fulluser);
                    resolve(fulluser)
                } else {
                    reject('Error: Usuario registrado')
                }
            }
        });

    });
};

getUser = (username) => {
    return new Promise((resolve, reject) => {
        if (!username) {
            reject('Error');
        }
        const user = store.get(username)
        resolve(user);
    });
}

updateUser = (first_name, last_name, email, username, password) => {
    return new Promise(async (resolve, reject) => {

        let errorMessage = '';
        let successMessage = '';

        if (!username || !password) {
            reject('Datos incorrectos');
        }

        let user = await store.get(username)
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            errorMessage = 'Contraseña incorrecta';
            resolve({user, errorMessage, successMessage})
        }

        const checkEmail = await store.checkEmail(username, email)
        if (checkEmail) {
            errorMessage = 'El email ya existe';
            resolve({user, errorMessage, successMessage})
        }

        user = await store.updateUser(username, first_name, last_name, email)
        successMessage = 'Se actualizaron los datos correctamente';
        resolve({user, errorMessage, successMessage})

    });
};

module.exports = {
    addUser,
    getUser,
    updateUser
}