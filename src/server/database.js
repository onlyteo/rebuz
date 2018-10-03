const MongoClient = require('mongodb').MongoClient;

let state = {
    db: null,
}

exports.connect = (config, done) => {
    if (state.db) {
        return done();
    } else {
        const url = `${config.database.protocol}://${config.database.host}:${config.database.port}/${config.database.database}`;
        MongoClient.connect(url, (err, db) => {
            if (err) {
                console.log(`Unable to connect to MongoDB on URL ${url}`);
                done(err);
            } else {
                state.db = db;
                done();
            }
        });
    }
}

exports.get = () => {
    return state.db;
}

exports.close = (done) => {
    if (state.db) {
        state.db.close((err, result) => {
            state.db = null;
            state.mode = null;
            done(err);
        });
    }
}