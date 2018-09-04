// Modules
const express = require('express');
const minimist = require('minimist');
const events = require('./events/resource')
const teams = require('./teams/resource')
// Variables
const server = express();
const isProduction = process.env.NODE_ENV === 'production';
const args = minimist(process.argv.slice(2));
const port = args.port || 8080;
const host = args.host || '0.0.0.0';

if (isProduction) {
    server.use(express.static('dist'));
}

// Configure backend
server.use('/api/events', events);
server.use('/api/teams', teams);
// Default route
server.use((req, res) => {
    res.status(404).send();
});

// Start server
server.listen(port, host, () => console.log('Listening on ' + host + ':' + port + '!'));
