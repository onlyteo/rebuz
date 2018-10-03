// Modules
const minimist = require('minimist');
const db = require('./database');
const server = require('./server');

// Variables
const args = minimist(process.argv.slice(2));

const config = {
    mode: process.env.NODE_ENV || 'development',
    server: {
        host: args.host || '0.0.0.0',
        port: args.port || 8080
    },
    database: {
        protocol: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'rebuz'
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

db.close((err) => {
    if (err) {
        process.exit(1);
    } else {
        process.exit(0);
    }
});
