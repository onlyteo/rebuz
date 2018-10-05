// Modules
const express = require('express');
const bodyParser = require('body-parser');
const events = require('../api/events');
const teams = require('../api/teams');
const questions = require('../api/questions');
const stats = require('../api/stats');

// Variables
const server = express();
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    server.use(express.static('dist'));
}

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Configure backend
server.use('/api/events', events);
server.use('/api/teams', teams);
server.use('/api/questions', questions);
server.use('/api/stats', stats);
// Default route
server.use((req, res) => {
    res.status(404).send();
});

exports.listen = (config) => {
    server.listen(config.server.port, config.server.host, () => {
        console.log(`Listening on ${config.server.port}:${config.server.host}!`);
    });
}