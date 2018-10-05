// Modules
const minimist = require('minimist');
const db = require('./core/database');
const server = require('./core/server');

// Variables
const args = minimist(process.argv.slice(2));

const config = {
    mode: process.env.NODE_ENV || 'development',
    server: {
        host: process.env.NODE_API_HOST || '0.0.0.0',
        port: process.env.NODE_API_PORT || 8080
    },
    database: {
        protocol: process.env.MONGO_DB_PROTOCOL || 'mongodb',
        host: process.env.MONGO_DB_HOST || 'localhost',
        port: process.env.MONGO_DB_PORT || 27017,
        database: process.env.MONGO_DB_DATABASE || 'rebuz',
        options: {
            useNewUrlParser: true
        }
    }
}

// Start server
db.connect(config, (err) => {
    if (err) {
        process.exit(1);
    } else {
        server.listen(config);
    }
});