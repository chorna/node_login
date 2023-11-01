const Model = require('./model.js');

addUser = (user) => {
    const myuser = new Model(user);
    myuser.save();
};

getUser = async (username) => {
    const user = await Model.findOne({username: username})
    return user;
}

checkUser = async (username, email) => {
    const user = await Model.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })
    return user;
}

checkEmail = async (username, email) => {
    const user = await Model.findOne({
        username: { $ne: username },
        email: email
    })
    return user;
}

updateUser = async (username, first_name, last_name, email) => {
    const user = await Model.findOne({username: username})

    if (user) {
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.save();
        return user;
    }
    return user
};

module.exports = {
    add: addUser,
    get: getUser,
    check: checkUser,
    checkEmail: checkEmail,
    updateUser: updateUser
}