const db = require('mongoose');

db.Promise = global.Promise;

connect = async (url) => {
    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('[db], conectada');
};

module.exports = connect;