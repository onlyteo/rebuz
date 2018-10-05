const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

exports.connect = (config, done) => {

    const url = `${config.database.protocol}://${config.database.host}:${config.database.port}/${config.database.database}`;

    mongoose.connect(url, config.database.options, (err) => {
        if (err) {
            console.log(`Unable to connect to MongoDB on URL ${url}`);
            done(err);
        } else {
            done();
        }
    });
}